from django.shortcuts import render

from django.http import JsonResponse


def index(request):
    users = {"title": "honeydo list"}
    return JsonResponse(users)
