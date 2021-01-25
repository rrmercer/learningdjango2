from django.shortcuts import render

from django.http import JsonResponse


def index(request):
    users = [{"id": 1,
             "title": "honeydo list",
             "description": "list of stuff for rob to do"
             },
             {"id": 2,
              "title": "Cosco list",
              "description": "list of stuff we need from cosco"}]
    return JsonResponse(users, safe=False)
