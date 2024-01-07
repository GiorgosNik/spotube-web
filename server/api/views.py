import json
from django.http import HttpResponse, JsonResponse, StreamingHttpResponse
from spotube import DownloadManager as Downloader
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
import os
import shutil
import mimetypes
import zipfile

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


def stream_zip_file(file_path, chunk_size=8192):
    with open(file_path, 'rb') as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            yield chunk

def get_songs(request, session_id):
    try:
        if session_id not in downloaders:
            return HttpResponse(f"ERROR: No active download session found for user {session_id}", status=400)

        zip_file_path = './songs' + session_id + '.zip'
        with zipfile.ZipFile(zip_file_path, 'w') as zip_file:
            for root, dirs, files in os.walk('songs/' + session_id):
                for file in files:
                    zip_file.write(os.path.join(root, file))

        response = StreamingHttpResponse(stream_zip_file(zip_file_path))
        content_type, encoding = mimetypes.guess_type(zip_file_path)
        response['Content-Type'] = content_type
        response['Content-Disposition'] = f'attachment; filename="songs{session_id}.zip"'

        shutil.rmtree(os.path.join('songs/' + session_id), ignore_errors=True)
        del downloaders[session_id]  # Remove downloader from dictionary

        return response
    except FileNotFoundError:
        return HttpResponse(f"ERROR: File not found: {zip_file_path}", status=400)
    except OSError as e:
        return HttpResponse(f"ERROR: OS error occurred: {e}", status=400)
    except Exception as e:
        return HttpResponse(f"ERROR: {e}", status=400)
