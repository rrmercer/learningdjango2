from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'), # all boards
    path('<int:boardid>', views.get_board, name='get_board'), # specific board
]