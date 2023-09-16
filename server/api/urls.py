from django.urls import path
from api import views

urlpatterns = [
    path("", views.home, name="home"),
    path("hello/<name>", views.hello_there, name="hello_there"),
    path("download", views.Download.as_view(), name="download"),
    path("status/<user_id>", views.get_status, name="get_status"),
    path("songs/<user_id>", views.get_songs, name="get_songs"),
]
