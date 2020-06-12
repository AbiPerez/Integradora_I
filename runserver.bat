@echo off
start python manage.py runserver
cd mysite/static/
start ng build