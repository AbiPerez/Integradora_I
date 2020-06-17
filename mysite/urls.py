from rest_app import views
from django.urls import path

urlpatterns = [
    path('', views.Index.as_view()),
    path('auth', views.auth_user),
    path('sign-in', views.create_user)
]
