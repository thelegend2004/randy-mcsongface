import axios from "axios";

export async function fetchDeezerPreview(artist: string, track: string) {
  const query = `${artist} ${track}`;
  const res = await axios.get("/deezer/search", {
    params: {
      q: query,
    },
  });

  if (res.data && res.data.data && res.data.data.length > 0) {
    const song = res.data.data[0];
    return {
      previewUrl: song.preview,
      deezereTrackId: song.id,
      title: song.title,
      artist: song.artist.name,
      cover: song.preview,
    };
  }
  return null;
}
