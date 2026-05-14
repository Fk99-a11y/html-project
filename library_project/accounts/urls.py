from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('', views.home, name='home'),
    path('search/', views.search_books, name='search_books'),
    path('dashboard/', views.user_view, name='user_view'),
    path('borrow/<int:book_id>/', views.borrow_book, name='borrow_book'),
    path('return/<int:book_id>/', views.return_book, name='return_book'),
    path('my-books/', views.borrowed_books, name='borrowed_books'),
    path('admin-dashboard/', views.admin_view, name='admin_view'),
    path('admin-dashboard/add/', views.add_book, name='add_book'),
    path('admin-dashboard/edit/<int:book_id>/', views.edit_book, name='edit_book'),
    path('admin-dashboard/delete/<int:book_id>/', views.delete_book, name='delete_book'),
]