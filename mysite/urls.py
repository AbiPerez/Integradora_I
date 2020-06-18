from rest_app import views
from django.urls import path

urlpatterns = [
    path('', views.Index.as_view()),
    path('auth', views.auth_user),
    path('sign-in', views.create_user),
    path('db_add', views.add_db),
    path('db_drop', views.drop_db),
    path('getNamesDB', views.get_db_names),
    path('getNamesTables', views.get_db_tables_names)
]
