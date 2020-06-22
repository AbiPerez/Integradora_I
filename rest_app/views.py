import os
import re
import hashlib
import shutil
import base64
from rest_framework import generics
from django.shortcuts import render
from django.http import HttpRequest
from django.http import JsonResponse
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from .models import User

from django.core.files.base import ContentFile


class Index(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)


@csrf_protect
def auth_user(request, *args, **kwargs):
    name = str(request.POST['name'])
    password = str(request.POST['password'])
    id = check_user(name, password)
    return JsonResponse({'id': id})


@csrf_protect
def create_user(request, *args, **kwargs):
    name = str(request.POST['name'])
    password = str(request.POST['password'])
    id = check_user(name, password)
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
    dbs = check_db_names(request)

    return JsonResponse({'response': dbs})


@csrf_protect
def get_dbs(request, *args, **kwargs):
    idUser = str(request.GET['idUser'])
    imgpath = os.path.join(
        os.getcwd(), 'db_reception/db_list_user_' + idUser) + os.sep

    dbs = []
    for root, dirnames, filenames in os.walk(imgpath):
        dbTables = []
        for filename in filenames:
            if re.search("\.(csv)$", filename):
                dbTables.append(filename.split('.')[0])
        dbName = root.split(os.sep)
        dbName = dbName[len(dbName) - 1]
        if dbName != '':
            db = [dbName, dbTables]
            dbs.append(db)

    return JsonResponse({'response': dbs})


@csrf_protect
def get_db_tables_names(request, *args, **kwargs):
    idUser = str(request.POST['idUser'])
    nameDB = str(request.POST['nameDB'])
    imgpath = os.path.join(
        os.getcwd(), 'db_reception/db_list_user_' + idUser + '/' + nameDB) + os.sep
    dbTables = []
    for root, dirnames, filenames in os.walk(imgpath):
        for filename in filenames:
            if re.search("\.(csv)$", filename):
                dbTables.append(filename.split('.')[0])

    return JsonResponse({'response': dbTables})


@csrf_protect
def get_db_table_records(request, *args, **kwargs):
    return JsonResponse({'response': 'ok'})


@csrf_protect
def set_db_table(request, *args, **kwargs):
    return JsonResponse({'response': 'ok'})


@csrf_protect
def add_db(request, *args, **kwargs):
    nameDB = str(request.POST['nameDB'])
    idUser = str(request.POST['idUser'])
    existingDB = check_db_names(request)
    for item in existingDB:
        if item == nameDB:
            return JsonResponse({'response': 501})
    os.makedirs('db_reception/db_list_user_' +
                idUser + '/' + nameDB, exist_ok=True)
    return JsonResponse({'response': 201})


@csrf_protect
def add_db_table(request, *args, **kwargs):
    nameDB = str(request.POST['nameDB'])
    fileTable = str(request.POST['fileTable'])
    nameTable = str(request.POST['nameTable']).split('.')[0]
    idUser = str(request.POST['idUser'])
    format, fileCSV = fileTable.split(';base64,')    
    existingTables = check_db_table_name(request)
    for item in existingTables:
        if item == nameTable:
            return JsonResponse({'response': 502})
    with open('db_reception/db_list_user_' + idUser + '/' + nameDB + '/' + nameTable + ".csv", "wb") as fh:
        fh.write(base64.b64decode(fileCSV))
    
    return JsonResponse({'response': 203})


@csrf_protect
def drop_db(request, *args, **kwargs):
    nameDB = str(request.POST['nameDB'])
    idUser = str(request.POST['idUser'])
    shutil.rmtree('db_reception/db_list_user_' + idUser +
                  '/' + nameDB, ignore_errors=True)

    return JsonResponse({'response': 202})


@csrf_protect
def drop_db_table(request, *args, **kwargs):
    nameDB = str(request.POST['nameDB'])
    nameTable = str(request.POST['nameTable'])
    idUser = str(request.POST['idUser'])
    os.remove('db_reception/db_list_user_' + idUser +
              '/' + nameDB + '/' + nameTable + '.csv')

    return JsonResponse({'response': 204})


@csrf_protect
def download_db(request, *args, **kwargs):
    return JsonResponse({'response': 'ok'})


def check_user(name, password):
    id = 0
    user = User.objects.filter(name=name, password=hashlib.sha256(
        bytes(password, 'utf-8')).hexdigest())
    for item in user:
        id = item.pk
    return id


def check_db_names(request):
    idUser = str(request.POST['idUser'])
    imgpath = os.path.join(
        os.getcwd(), 'db_reception/db_list_user_' + idUser) + os.sep
    dbs = []
    for root, dirnames, filenames in os.walk(imgpath):
        dbName = root.split(os.sep)
        dbName = dbName[len(dbName) - 1]
        if dbName != '':
            dbs.append(dbName)

    return dbs


def check_db_table_name(request):
    idUser = str(request.POST['idUser'])
    nameDB = str(request.POST['nameDB'])
    imgpath = os.path.join(os.getcwd(), 'db_reception/db_list_user_' + idUser + '/' + nameDB) + os.sep
    dbTables = []
    for root, dirnames, filenames in os.walk(imgpath):
        for filename in filenames:
            if re.search("\.(csv)$", filename):
                dbTables.append(filename.split('.')[0])
    return dbTables
