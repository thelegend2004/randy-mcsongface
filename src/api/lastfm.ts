import axios from "axios";

// TODO: Hide api key
const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const BASE_URL = import.meta.env.VITE_LASTFM_URL;

export const fetchTopTracksByGenre = async (genre: string, page: number) => {
  const response = await axios.get(BASE_URL, {
    params: {
      method: "tag.gettoptracks",
      tag: genre,
      api_key: API_KEY,
      format: "json",
      limit: 50,
      page: page,
    },
  });

  return response.data.tracks.track;
};

export async function fetchTrackInfo(artist: string, track: string) {
  const res = await axios.get(BASE_URL, {
    params: {
      method: "track.getInfo",
      api_key: API_KEY,
      artist,
      track,
      format: "json",
    },
  });
  return res.data.track;
}
