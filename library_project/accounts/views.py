from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Profile


def login_view(request):
    error = None

    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user_obj = User.objects.get(email=email)
            username = user_obj.username

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                error = "Invalid email or password"

        except User.DoesNotExist:
            error = "Invalid email or password"

    return render(request, 'accounts/login.html', {'error': error})


def signup_view(request):
    error = None

    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        image = request.POST.get('image')
        is_admin = request.POST.get('is_admin') == 'on'

        if User.objects.filter(username=username).exists():
            error = "Username already exists"

        elif User.objects.filter(email=email).exists():
            error = "Email already exists"

        else:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )

     
            profile = user.profile
            profile.image = image
            profile.is_admin = is_admin
            profile.save()

        
            if is_admin:
                user.is_staff = True
                user.save()

            return redirect('login')

    return render(request, 'accounts/signup.html', {'error': error})


def logout_view(request):
    logout(request)
    return redirect('login')


def home(request):
    return render(request, 'accounts/home.html')


def search_books(request):
    return render(request, 'accounts/search_books.html')