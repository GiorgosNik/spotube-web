from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
import shutil
import os

class ApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_download(self):
        response = self.client.post(
            reverse('download'), # Generate the URL for the 'download' named URL pattern
            {
                "session_id": "test",
                "playlist_link": "https://open.spotify.com/playlist/69jfWlcZdH0vTplpLwcZdZ?si=cc28ff445ed84528",
                "normalize_volume": False
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_status(self):
        self.client.post(
            reverse('download'), # Generate the URL for the 'download' named URL pattern
            {
                "session_id": "test2",
                "playlist_link": "https://open.spotify.com/playlist/69jfWlcZdH0vTplpLwcZdZ?si=cc28ff445ed84528",
                "normalize_volume": False
            },
            format='json'
        )
        response = self.client.get(
            reverse('get_status', args=['test2']),
            format='json'
        )
        response_json = response.json()
        response_json['progress'] = 0
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cancel_download(self):
        self.client.post(
            reverse('download'), # Generate the URL for the 'download' named URL pattern
            {
                "session_id": "test4",
                "playlist_link": "https://open.spotify.com/playlist/69jfWlcZdH0vTplpLwcZdZ?si=cc28ff445ed84528",
                "normalize_volume": False
            },
            format='json'
        )
        response = self.client.post(
            reverse('cancel_download'),
            {
                "session_id": "test4"
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_songs(self):
        self.client.post(
            reverse('download'), # Generate the URL for the 'download' named URL pattern
            {
                "session_id": "test3",
                "playlist_link": "https://open.spotify.com/playlist/69jfWlcZdH0vTplpLwcZdZ?si=cc28ff445ed84528",
                "normalize_volume": False
            },
            format='json'
        )
        progressPercentage = 0
        while progressPercentage < 100:
            response = self.client.get(
                reverse('get_status', args=['test3']),
                format='json'
            )
            response_json = response.json()
            progressPercentage = response_json['progressPercentage']
            
        response = self.client.get(
            reverse('get_songs', args=['test3']),
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
