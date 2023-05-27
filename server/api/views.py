import json
import os
from django.shortcuts import render
from django.http import HttpResponse
from django.utils.timezone import datetime
import re
from spotube import downloader as Downloader
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
import os
import zipfile
# from django.views.decorators.csrf import csrf_protect
# from django.middleware.csrf import get_token

from dotenv import load_dotenv
load_dotenv()  # loads the configs from .env

downloaders = {}

class Download(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        data = json.loads(request.body)
        user_id = data['user_id']
        print(data['playlist_link'])
        print(user_id)

        downloader = Downloader(
            str(os.getenv('SPOTIFY_CLIENT_ID')),
            str(os.getenv('SPOTIFY_CLIENT_SECRET')),
            str(os.getenv('GENIUS_API_KEY')),
            "songs" + user_id,
            True
        )
        downloaders[user_id] = downloader
        downloader.start_downloader(data['playlist_link'])
        return HttpResponse("Download for user " + user_id + " started!")
    
def get_progress(request, user_id):
    return HttpResponse(downloaders[user_id].get_progress())

def get_progress_percentage(request, user_id):
    downloader = downloaders[user_id]
    return HttpResponse(downloader.get_progress() / downloader.get_total() * 100)

def get_songs(request, user_id):
    zip_file = zipfile.ZipFile('songs' + user_id + '.zip', 'w')
    for root, dirs, files in os.walk('songs' + user_id):
        for file in files:
            zip_file.write(os.path.join(root, file))
    zip_file.close()

    zip_file_path = './songs' + user_id + '.zip'
    with open(zip_file_path, 'rb') as zip:
        response = HttpResponse(zip.read())
        response['content_type'] = 'application/zip'
        response['Content-Disposition'] = 'attachment; filename="songs' + user_id + '.zip"'
        return response
    
# Create your views here.

def home(request):
    return HttpResponse("Hello, Django!")

def hello_there(request, name):
    now = datetime.now()
    formatted_now = now.strftime("%A, %d %B, %Y at %X")

    # Filter the name argument to letters only using regular expressions. URL arguments
    # can contain arbitrary text, so we restrict to safe characters only.
    match_object = re.match("[a-zA-Z]+", name)

    if match_object:
        clean_name = match_object.group(0)
    else:
        clean_name = "Friend"

    content = "Hello there, " + clean_name + "! It's " + formatted_now
    return HttpResponse(content)
