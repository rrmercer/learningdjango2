from django.urls import path

from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', views.index, name='index'), # all boards
    path('<int:boardid>', views.get_board, name='get_board'), # specific board
    path('add', csrf_exempt(views.save_board), name='save_board'), # add a new board
]