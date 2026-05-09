from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),

    path('', views.home, name='home'),
    path('search/', views.search_books, name='search_books'),
    path('user-dashboard/', views.user_view, name='user_view'),
    path('admin-dashboard/', views.admin_view, name='admin_view'),
    path('edit-book/', views.edit_book, name='edit_book'),

]