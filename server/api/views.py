import json
import os
from django.shortcuts import render
from django.http import HttpResponse
from django.utils.timezone import datetime
import re
from spotube import DownloadManager as DownloadManager
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
import os
import zipfile
import shutil

from dotenv import load_dotenv
load_dotenv()  # loads the configs from .env

downloaders = {}

class Download(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        data = json.loads(request.body)
        session_id = data['session_id']
        print(data['playlist_link'])
        print(session_id)

        downloader = DownloadManager(
            str(os.getenv('SPOTIFY_CLIENT_ID')),
            str(os.getenv('SPOTIFY_CLIENT_SECRET')),
            str(os.getenv('GENIUS_API_KEY')),
            "./songs/" + session_id,
            True
        )
        downloaders[session_id] = downloader
        downloader.start_downloader(data['playlist_link'])
        return HttpResponse("Download for user " + session_id + " started!")
    
class CancelDownload(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        try:
            data = json.loads(request.body)
            session_id = data['session_id']
            downloader = downloaders[session_id]
            downloader.cancel_downloader()
            return HttpResponse("Cancel download for user " + session_id + " started!")
        except Exception as e:
            return HttpResponse(e, status = 400) 

def get_status(request, session_id):
    try:
        downloader = downloaders[session_id]
        if downloader.get_total() == 0:
            total = 1
        else:
            total = downloader.get_total()
        status_info = {
            "progress": downloader.get_progress(),
            "progressPercentage": downloader.get_progress() / total * 100,
            "total": downloader.get_total(),
            "failed": downloader.get_fail_counter(),
            "succeeded": downloader.get_success_counter(),
            "ETA": downloader.get_eta(),
        }
        print(status_info)
        return HttpResponse(status_info)
    except Exception as e:
        print(str(e))
        return HttpResponse(str(e), status = 400) 


def get_songs(request, session_id):
    zip_file_path = './songs' + session_id + '.zip'
    zip_file = zipfile.ZipFile(zip_file_path, 'w')
    for root, dirs, files in os.walk('songs/' + session_id):
        for file in files:
            zip_file.write(os.path.join(root, file))
    zip_file.close()

    
    with open(zip_file_path, 'rb') as zip:
        response = HttpResponse(zip.read())
        response['content_type'] = 'application/zip'
        response['Content-Disposition'] = 'attachment; filename="songs' + session_id + '.zip"'

    os.remove(zip_file_path)
    shutil.rmtree(os.path.join('songs/' + session_id), ignore_errors = True)
    del downloaders[session_id] # Remove downloader from dictionary

    return response

def home(request):
    return HttpResponse("Hello, Django!")
