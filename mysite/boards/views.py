from django.shortcuts import render

from django.http import JsonResponse


def index(request):
    users = [{"id": 1,
             "title": "209 Georgetown Project List",
             "description": "list of stuff for rob to do"
             },
             {"id": 2,
              "title": "Cosco list",
              "description": "list of stuff we need from cosco"}]
    return JsonResponse(users, safe=False)


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