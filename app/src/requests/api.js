import axios from 'axios';

export function downloadRequest(playlist_link, session_id, downloadLyrics, normalizeAudio) {
  console.log(process.env.REACT_APP_API_BASE_URL);
    const requestOptions = {
        playlist_link: playlist_link,
        session_id: session_id,
        normalize_volume: normalizeAudio,
        download_lyrics: downloadLyrics
      };
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/download`,requestOptions);
}

export function fetchStatus(session_id) {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/status/${session_id}`);
}