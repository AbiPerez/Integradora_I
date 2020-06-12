from rest_framework import generics
from django.shortcuts import render
from django.http import HttpRequest
from django.http import JsonResponse
from django.views.generic import TemplateView

class Index(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)

