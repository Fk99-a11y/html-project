from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from .models import Profile, Book, BorrowRecord


# ─── Auth Views ───────────────────────────────────────────────────────────────

def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')

    error = None
    if request.method == "POST":
        email = request.POST.get('email', '').strip()
        password = request.POST.get('password', '').strip()

        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(request, username=user_obj.username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                error = "Invalid email or password."
        except User.DoesNotExist:
            error = "Invalid email or password."

    return render(request, 'accounts/login.html', {'error': error})


def signup_view(request):
    if request.user.is_authenticated:
        return redirect('home')

    error = None
    if request.method == "POST":
        username = request.POST.get('username', '').strip()
        email = request.POST.get('email', '').strip()
        password = request.POST.get('password', '').strip()
        image = request.POST.get('image', 'avtar1.jpg')
        is_admin = request.POST.get('is_admin') == 'on'

        if len(username) < 3:
            error = "Username must be at least 3 characters."
        elif User.objects.filter(username=username).exists():
            error = "Username already taken."
        elif User.objects.filter(email=email).exists():
            error = "Email already registered."
        elif len(password) < 6:
            error = "Password must be at least 6 characters."
        else:
            user = User.objects.create_user(username=username, email=email, password=password)
            profile = user.profile
            # Store just the filename (e.g. avtar1.jpg)
            img_filename = image.split('/')[-1]
            profile.image = img_filename
            profile.is_admin = is_admin
            profile.save()

            if is_admin:
                user.is_staff = True
                user.save()

            messages.success(request, "Account created! Please log in.")
            return redirect('login')

    return render(request, 'accounts/signup.html', {'error': error})


def logout_view(request):
    logout(request)
    return redirect('login')


# ─── Home ─────────────────────────────────────────────────────────────────────

def home(request):
    return render(request, 'accounts/home.html')


# ─── Search / Browse Books ────────────────────────────────────────────────────

def search_books(request):
    query = request.GET.get('q', '').strip()
    author = request.GET.get('author', '').strip()
    category = request.GET.get('category', '').strip()

    books = Book.objects.all()

    if query:
        books = books.filter(title__icontains=query)
    if author:
        books = books.filter(author__icontains=author)
    if category:
        books = books.filter(category__icontains=category)

    categories = Book.objects.values_list('category', flat=True).distinct()

    context = {
        'books': books,
        'categories': categories,
        'query': query,
        'author': author,
        'selected_category': category,
    }
    return render(request, 'accounts/search_books.html', context)


# ─── User Dashboard ───────────────────────────────────────────────────────────

@login_required
def user_view(request):
    books = Book.objects.all()
    borrowed_ids = BorrowRecord.objects.filter(
        user=request.user, returned=False
    ).values_list('book_id', flat=True)

    context = {
        'books': books,
        'borrowed_ids': list(borrowed_ids),
    }
    return render(request, 'accounts/user_view.html', context)


@login_required
def borrow_book(request, book_id):
    if request.method == 'POST':
        book = get_object_or_404(Book, id=book_id)

        already = BorrowRecord.objects.filter(user=request.user, book=book, returned=False).exists()
        if already:
            messages.warning(request, f'You already borrowed "{book.title}".')
        elif not book.status:
            messages.error(request, f'"{book.title}" is not available.')
        else:
            BorrowRecord.objects.create(user=request.user, book=book)
            book.status = False
            book.save()
            messages.success(request, f'"{book.title}" borrowed successfully!')

    return redirect('user_view')


@login_required
def return_book(request, book_id):
    if request.method == 'POST':
        book = get_object_or_404(Book, id=book_id)
        record = BorrowRecord.objects.filter(user=request.user, book=book, returned=False).first()
        if record:
            record.returned = True
            record.save()
            book.status = True
            book.save()
            messages.success(request, f'"{book.title}" returned successfully!')
        else:
            messages.error(request, 'No active borrow record found.')

    return redirect('user_view')


@login_required
def borrowed_books(request):
    records = BorrowRecord.objects.filter(user=request.user, returned=False).select_related('book')
    return render(request, 'accounts/borrowed_books.html', {'records': records})


# ─── Admin Views ──────────────────────────────────────────────────────────────

def admin_required(view_func):
    """Decorator: user must be logged in and is_staff."""
    from functools import wraps
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login')
        if not request.user.is_staff:
            messages.error(request, 'Access denied. Admins only.')
            return redirect('home')
        return view_func(request, *args, **kwargs)
    return wrapper


@admin_required
def admin_view(request):
    books = Book.objects.all()
    categories = Book.objects.values_list('category', flat=True).distinct()
    return render(request, 'accounts/AdminView.html', {'books': books, 'categories': categories})


@admin_required
def add_book(request):
    categories = Book.objects.values_list('category', flat=True).distinct()
    error = None

    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        author = request.POST.get('author', '').strip()
        category = request.POST.get('category', '').strip()
        description = request.POST.get('description', '').strip()
        status = request.POST.get('status') == 'true'

        if not title or not author or not category:
            error = "Title, Author and Category are required."
        else:
            Book.objects.create(
                title=title,
                author=author,
                category=category,
                description=description,
                status=status,
            )
            messages.success(request, f'Book "{title}" added successfully!')
            return redirect('admin_view')

    return render(request, 'accounts/add_book.html', {'categories': categories, 'error': error})


@admin_required
def edit_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    categories = Book.objects.values_list('category', flat=True).distinct()
    error = None

    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        author = request.POST.get('author', '').strip()
        category = request.POST.get('category', '').strip()
        description = request.POST.get('description', '').strip()
        status = request.POST.get('status') == 'true'

        if not title or not author or not category:
            error = "Title, Author and Category are required."
        else:
            book.title = title
            book.author = author
            book.category = category
            book.description = description
            book.status = status
            book.save()
            messages.success(request, f'Book "{title}" updated successfully!')
            return redirect('admin_view')

    return render(request, 'accounts/edit_book.html', {
        'book': book,
        'categories': categories,
        'error': error,
    })


@admin_required
def delete_book(request, book_id):
    if request.method == 'POST':
        book = get_object_or_404(Book, id=book_id)
        title = book.title
        book.delete()
        messages.success(request, f'Book "{title}" deleted.')
    return redirect('admin_view')