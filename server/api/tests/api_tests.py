from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

class ApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_download(self):
        response = self.client.post(
            reverse('download'), # Generate the URL for the 'download' named URL pattern
            {
                "session_id": "test",
                "playlist_link": "https://open.spotify.com/playlist/69jfWlcZdH0vTplpLwcZdZ?si=cc28ff445ed84528"
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_status(self):
        response = self.client.get(
            reverse('get_status', args=['test']),
            format='json'
        )
        response_json = response.json()
        response_json['progress'] = 0
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_songs(self):
        progress = 0
        while progress < 100:
            response = self.client.get(
                reverse('get_status', args=['test']),
                format='json'
            )
            response_json = response.json()
            progress = response_json['progress']
            
        response = self.client.get(
            reverse('get_songs', args=['test']),
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cancel_download(self):
        response = self.client.post(
            reverse('download'), # Generate the URL for the 'download' named URL pattern
            {
                "session_id": "test2",
                "playlist_link": "https://open.spotify.com/playlist/69jfWlcZdH0vTplpLwcZdZ?si=cc28ff445ed84528"
            },
            format='json'
        )
        response = self.client.post(
            reverse('cancel_download'),
            {
                "session_id": "test2"
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
