import axios from 'axios';

export async function  downloadRequest(playlist_link, session_id, downloadLyrics, normalizeAudio) {
    const requestOptions = {
        playlist_link: playlist_link,
        session_id: session_id,
        normalize_volume: normalizeAudio,
        download_lyrics: downloadLyrics
      };
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/download`,requestOptions);
}

export async function fetchStatus(session_id) {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/status/${session_id}`);
}

export async function fetchArchiveNumber(session_id) {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/songs/${session_id}`);
}