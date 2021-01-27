from django.shortcuts import render

from django.http import JsonResponse

from .models import Board
from .serializers import BoardSerializer

def index(request):
    serializer_class = BoardSerializer
    queryset = Board.objects.all()
    # TODO: learn how to do this serialization correctly
    result = []
    for entry in queryset:
        result.append(BoardSerializer(entry).data)
    return JsonResponse(result, safe=False)


def get_board(request, boardid):
    stubbed_response = [{"id": 1,
                        "description": "fix hinges in laundry room"},
                        {"id": 2,
                        "description": "Organize and secure cable behind outdoor tv to wall"},
                        {"id": 3,
                        "description": "Attach thomas dresser and book shelf to wall"},
                        {"id": 4,
                        "description": "setup kwikset doorlock with main key"},
                        {"id": 5,
                        "description": "wash cars"}]
    return JsonResponse(stubbed_response, safe=False)