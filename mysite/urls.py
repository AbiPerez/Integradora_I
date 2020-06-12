from django.contrib import admin
from rest_app import views
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.Index.as_view())
]
