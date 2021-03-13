from django.shortcuts import render

from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.urls import reverse

from .models import Board, Card, CardForm, BoardForm
from .serializers import BoardSerializer, CardSerializer

def index(request):
    queryset = Board.objects.all()
    # TODO: learn how to do this serialization correctly
    result = []
    for entry in queryset:
        result.append(BoardSerializer(entry).data)
    return JsonResponse(result, safe=False)


def get_board(request, boardid):
    queryset = Card.objects.filter(board_id=boardid)
    result = []
    for entry in queryset:
        result.append(CardSerializer(entry).data)
    return JsonResponse(result, safe=False)

def save_board(request):
    form = BoardForm(request.POST)
    result = form.save()
    return JsonResponse(BoardSerializer(result).data, safe=False)

def update_board(request, boardid):
    boardToUpdate = Board.objects.get(pk=boardid)
    form = BoardForm(request.POST, instance=boardToUpdate)
    if form.is_valid():
        form.save()
    return JsonResponse({
        "result": "success"
    }, safe=False)

def delete_board(request, boardid):
    boardToDelete = Board.objects.get(pk=boardid)
    boardToDelete.delete()
    return JsonResponse({
        "result": "success"
    }, safe=False)


# Card methods
def save_card(request):
    form = CardForm(request.POST)
    result = form.save()
    return JsonResponse(CardSerializer(result).data, safe=False)