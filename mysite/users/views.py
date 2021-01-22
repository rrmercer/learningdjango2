from django.shortcuts import render

from django.http import JsonResponse


def index(request):
    users = {"firstname": "jon", "lastname": "smith"}
    return JsonResponse(users)
