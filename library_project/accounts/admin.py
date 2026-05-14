from django.contrib import admin
from .models import Book, Profile, BorrowRecord

admin.site.register(Book)
admin.site.register(Profile)
admin.site.register(BorrowRecord)