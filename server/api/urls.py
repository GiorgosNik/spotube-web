from django.urls import path
from api import views

urlpatterns = [
    path("download", views.Download.as_view(), name="download"),
    path("status/<session_id>", views.get_status, name="get_status"),
    path("songs/<session_id>", views.get_songs, name="get_songs"),
    path("cancelDownload", views.CancelDownload.as_view(), name="cancel_download"),
]
