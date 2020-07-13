from rest_app import views
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.Index.as_view()),
    path('auth', views.auth_user),
    path('sign-in', views.create_user),
    path('db_add', views.add_db),
    path('db_table_add', views.add_db_table),
    path('db_drop', views.drop_db),
    path('db_table_drop', views.drop_db_table),
    path('get_records', views.get_db_table_records),
    path('getNamesDB', views.get_db_names),
    path('getNamesTables', views.get_db_tables_names),
    path('getDbs', views.get_dbs),
    path('getDb', views.download_db),
    path('set_new_column', views.set_db_table),
    path('drop_column', views.drop_db_table_column)
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
