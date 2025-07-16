import axios from "axios";

// TODO: Hide api key
const API_KEY = "4fba5580d5a87cc9fdc6f8804555c5d8";
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

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
