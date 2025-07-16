import { useState } from "react";
import { fetchTopTracksByGenre, fetchTrackInfo } from "../api/lastfm";
import { fetchDeezerPreview } from "../api/deezer";
import genres from "../data/genres.json";
import noAlbumCover from "../assets/no-album.svg";

export function PlaylistGenerator() {
  const [genre, setGenre] = useState("rock");
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [trackInfos, setTrackInfos] = useState<any[]>([]);
  const [previews, setPreviews] = useState<(string | null)[]>([]);

  const handleGeneratePlaylist = async () => {
    const randomPage = Math.floor(Math.random() * 10) + 1;
    const playlist = await fetchTopTracksByGenre(genre, randomPage);
    const randomizedPlaylist = playlist
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    setPlaylist(randomizedPlaylist);
    await handleGenerateAlbumInfo(randomizedPlaylist);

    const previewData = await Promise.all(
      randomizedPlaylist.map((track: any) =>
        fetchDeezerPreview(track.artist.name, track.name)
      )
    );

    setPreviews(previewData);
  };

  const handleGenerateAlbumInfo = async (tracks: any[]) => {
    const albumInfo = await Promise.all(
      tracks.map((track) => fetchTrackInfo(track.artist.name, track.name))
    );

    setTrackInfos(albumInfo);
  };

  return (
    <div>
      <h2>Select desired genre</h2>
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        {genres.map((g: string) => (
          <option key={g} value={g}>
            {g.charAt(0).toUpperCase() + g.slice(1)}
          </option>
        ))}
      </select>

      <button onClick={handleGeneratePlaylist}>Create Playlist</button>

      <ul>
        {playlist.map((track, index) => (
          <li key={track.url}>
            {track.name} - {track.artist.name} -{" "}
            {trackInfos[index]?.album?.title || "No data"}{" "}
            {trackInfos[index]?.wiki?.published || "No data"}
            <img
              src={
                trackInfos[index]?.album?.image.find(
                  (img: any) => img.size === "large"
                )["#text"] || noAlbumCover
              }
              alt="Album cover"
            />
            {previews[index] && (
              <audio controls src={previews[index].previewUrl}>
                Your browser does not support the audio element.
              </audio>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
