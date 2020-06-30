import base64
import hashlib
import numpy as np
import os
import pandas as pd
import re
import shutil
import sys

from django.core.files.base import ContentFile
from django.http import HttpRequest, HttpResponse, JsonResponse, FileResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.views.generic import TemplateView
from rest_framework import generics
from zipfile import ZipFile

from .models import User

class Index(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)

@csrf_protect
def auth_user(request, *args, **kwargs):
    name = str(request.POST['name'])
    password = str(request.POST['password'])
    idUser = check_user(name, password)
    return JsonResponse({'id': idUser})

@csrf_protect
def create_user(request, *args, **kwargs):
    name = str(request.POST['name'])
    password = str(request.POST['password'])
    id = check_user(name, password)
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
    idUser = str(request.POST['idUser'])
    nameDB = str(request.POST['nameDB'])
    nameTable = str(request.POST['nameTable'])
    dataFrame = pd.read_csv('db_reception/db_list_user_' + idUser + '/' + nameDB + '/' + nameTable + '.csv')
    
    return JsonResponse({'response': dataFrame.to_json(orient='columns')})

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
    existingTables = check_db_table_name(idUser, nameDB)
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
    idUser = str(request.GET['idUser'])
    nameDB = str(request.GET['nameDB'])
    file_path = 'db_reception/db_list_user_' + idUser + '/temp_' + nameDB
    dir_path = 'db_reception/db_list_user_' + idUser + '/' + nameDB
    zf = shutil.make_archive(file_path, 'zip', dir_path)
    file_path = file_path + '.zip'
    zf = open(file_path, 'rb')
    response = HttpResponse(zf, content_type="application/zip")
    response['Content-Disposition'] = 'attachment; filename="temp.zip"'
    os.remove(file_path)

    return response

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

def check_db_table_name(id, db):
    imgpath = os.path.join(
        os.getcwd(), 'db_reception/db_list_user_' + id + '/' + db) + os.sep
    dbTables = []
    for root, dirnames, filenames in os.walk(imgpath):
        for filename in filenames:
            if re.search("\.(csv)$", filename):
                dbTables.append(filename.split('.')[0])

    return dbTables