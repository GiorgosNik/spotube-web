from django.urls import path
from api import views

urlpatterns = [
    path("", views.home, name="home"),
    path("hello/<name>", views.hello_there, name="hello_there"),
    path("download", views.Download.as_view(), name="download"),
    path("progress/<user_id>", views.get_progress, name="get_progress"),
]
