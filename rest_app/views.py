import os
import hashlib

from rest_framework import generics
from django.shortcuts import render
from django.http import HttpRequest
from django.http import JsonResponse
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_protect, csrf_exempt

from .models import User


class Index(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)


@csrf_protect
def auth_user(request, *args, **kwargs):
    name = str(request.POST['name'])
    password = str(request.POST['password'])
    id = check_user(name,password)
    return JsonResponse({'id': id})

@csrf_protect
def create_user(request, *args, **kwargs):
    name = str(request.POST['name'])
    password = str(request.POST['password'])
    id = check_user(name,password)
    print(id)
    if(id == 0):
        user = User(name=name, password=hashlib.sha256(
            bytes(password, 'utf-8')).hexdigest())
        user.save()
        id = user.pk
        os.makedirs('db_reception/db_list_user_' + str(id), exist_ok=True)
        return JsonResponse({'id': id})
    else:
        return JsonResponse({'id': -1})

@csrf_protect
def drop_user(request, *args, **kwargs):
    return JsonResponse({'response': 'ok'})

@csrf_protect
def get_db_names(request, *args, **kwargs):
    return JsonResponse({'response': 'ok'})

@csrf_protect
def get_db(request, *args, **kwargs):
    return JsonResponse({'response': 'ok'})

@csrf_protect
def get_db_tables(request, *args, **kwargs):
    return JsonResponse({'response': 'ok'})

@csrf_protect
def get_db_table_records(request, *args, **kwargs):
    return JsonResponse({'response': 'ok'})

@csrf_protect
def set_db_table(request, *args, **kwargs):
    return JsonResponse({'response': 'ok'})

@csrf_protect
def add_db_zip(request, *args, **kwargs):
    return JsonResponse({'response': 'ok'})

@csrf_protect
def add_db(request, *args, **kwargs):
    nameDB = str(request.POST['nameDB'])
    idUser = str(request.POST['idUser'])
    os.makedirs('db_reception/db_list_user_' + idUser + '/' + nameDB, exist_ok=True)
    return JsonResponse({'response': 200})

@csrf_protect
def drop_db(request, *args, **kwargs):
    return JsonResponse({'response': 'ok'})

@csrf_protect
def download_db(request, *args, **kwargs):
    return JsonResponse({'response': 'ok'})

def check_user(name,password):
    id = 0
    user = User.objects.filter(name=name, password=hashlib.sha256(
        bytes(password, 'utf-8')).hexdigest())
    for item in user:
        id = item.pk
    return id