import json
import os
from django.http import HttpResponse, JsonResponse
from spotube import DownloadManager as Downloader
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
import os
import zipfile
import shutil

downloaders = {}

class Download(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        try: 
            data = json.loads(request.body)
            session_id = data['session_id']
            normalize_volume = data['normalize_volume']

            downloader = Downloader(
                str(os.getenv('SPOTIFY_CLIENT_ID')),
                str(os.getenv('SPOTIFY_CLIENT_SECRET')),
                str(os.getenv('GENIUS_API_KEY')),
                "./songs/" + session_id,
                False,
                normalize_volume,
                int(str(os.getenv('SONG_NUMBER_LIMIT')))
            )
            downloaders[session_id] = downloader
            downloader.start_downloader(data['playlist_link'])
            return HttpResponse("Download for user " + session_id + " started!")
        except KeyError as ke:
            return HttpResponse(f"ERROR: Missing key in request: {ke}", status = 400)
        except json.JSONDecodeError:
            return HttpResponse("ERROR: Invalid JSON format", status = 400)
        except Exception as e:
            return HttpResponse(f"ERROR: {e}", status = 400)
    
class CancelDownload(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        try:
            data = json.loads(request.body)
            session_id = data['session_id']
            downloader = downloaders[session_id]
            downloader.cancel_downloader()

            shutil.rmtree(os.path.join('songs/' + session_id), ignore_errors = True)
            del downloaders[session_id] # Remove downloader from dictionary

            return JsonResponse("Cancel download for user " + session_id + " started!", safe = False)
        except KeyError as ke:
            return HttpResponse(f"ERROR: Missing key in request: {ke}", status = 400)
        except json.JSONDecodeError:
            return HttpResponse("ERROR: Invalid JSON format", status = 400)
        except Exception as e:
            return HttpResponse(f"ERROR: {e}", status = 400)

def get_status(request, session_id):
    try:
        if session_id not in downloaders:
            return HttpResponse(f"No active download session found for user {session_id}", status=400)

        downloader = downloaders[session_id]
        total = 1 if downloader.get_total() == 0 else downloader.get_total()
        status_info = {
            "progress": downloader.get_progress(),
            "progressPercentage": downloader.get_progress() / total * 100,
            "total": total,
            "failed": downloader.get_fail_counter(),
            "succeeded": downloader.get_success_counter(),
            "ETA": downloader.get_eta(),
        }
        return JsonResponse(status_info, safe = False)
    except Exception as e:
        return HttpResponse(f"ERROR: {e}", status = 400)


def get_songs(request, session_id):
    try: 
        if session_id not in downloaders:
            return HttpResponse(f"ERROR: No active download session found for user {session_id}", status = 400)

        size = create_zip_files(session_id, 70)
        status_info = {
            "size": size
        }
        return JsonResponse(status_info, safe = False)

    except Exception as e:
        return HttpResponse(f"ERROR: {e}", status = 400)

def download_part(request, session_id_part):
    try:
        zip_file_path = f'./songs/{session_id_part}.zip'
        with open(zip_file_path, 'rb') as zip:
            response = HttpResponse(zip.read())
            response['content_type'] = 'application/zip'
            response['Content-Disposition'] = f'attachment; filename="songs_{session_id_part}.zip"'
            
        return response
    except FileNotFoundError:
        return HttpResponse(f"ERROR: File not found: {zip_file_path}", status=400)
    except OSError as e:
        return HttpResponse(f"ERROR: OS error occurred: {e}", status=400)
    except Exception as e:
        return HttpResponse(f"ERROR: {e}", status=400)

def create_zip_files(session_id, max_size_mb):
    files = [f for f in os.listdir('./songs/' + session_id) if f.endswith('.mp3')]
    
    current_zip_index = 1
    current_zip_size = 0
    zip_file_path = f'./songs/{session_id}_part{current_zip_index}.zip'
    zip_file = zipfile.ZipFile(zip_file_path, 'w')

    for file in files:
        file_path = os.path.join('./songs/' + session_id, file)
        file_size_mb = os.path.getsize(file_path) / (1024 ** 2)

        if current_zip_size + file_size_mb > max_size_mb:
            zip_file.close()
            current_zip_index += 1
            zip_file_path = f'./songs/{session_id}_part{current_zip_index}.zip'
            zip_file = zipfile.ZipFile(zip_file_path, 'w')
            current_zip_size = 0

        zip_file.write(file_path)
        current_zip_size += file_size_mb

    zip_file.close()
    return current_zip_index
