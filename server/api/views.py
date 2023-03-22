import os
from django.shortcuts import render
from django.http import HttpResponse
from django.utils.timezone import datetime
import re
from spotube import downloader as Downloader

from dotenv import load_dotenv
load_dotenv()  # loads the configs from .env

downloader = Downloader(
    str(os.getenv('SPOTIFY_CLIENT_ID')),
    str(os.getenv('SPOTIFY_CLIENT_SECRET')),
    str(os.getenv('GENIUS_API_KEY')),
)

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

def download(request, link):
    downloader.start_downloader(link)
    return HttpResponse("Hello, Django!")