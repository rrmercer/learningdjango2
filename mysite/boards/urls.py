from django.urls import path

from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    # board methods
    path('', views.index, name='index'), # all boards
    path('<int:boardid>', views.get_board, name='get_board'), # specific board
    path('add', csrf_exempt(views.save_board), name='save_board'), # add a new board
    path('update/<int:boardid>', csrf_exempt(views.update_board), name='update_board'), # update an existing board
    path('delete/<int:boardid>', csrf_exempt(views.delete_board), name='delete_board'),

    # card methods
    path('add_card', csrf_exempt(views.save_card), name='save_card'), # add a new card
]