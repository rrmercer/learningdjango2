from django.contrib import admin

from django.contrib import admin
from .models import Board

class BoardsAdmin(admin.ModelAdmin):
  list_display = ('title', 'description')

# Register your models here.
admin.site.register(Board, BoardsAdmin) 