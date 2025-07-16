import { useState } from "react";
import { fetchTopTracksByGenre, fetchTrackInfo } from "../api/lastfm";

export function PlaylistGenerator() {
  const [genre, setGenre] = useState("rock");
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [trackInfos, setTrackInfos] = useState<any[]>([]);

  const handleGeneratePlaylist = async () => {
    const randomPage = Math.floor(Math.random() * 10) + 1;
    const playlist = await fetchTopTracksByGenre(genre, randomPage);
    const randomizedPlaylist = playlist
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setPlaylist(randomizedPlaylist);

    await handleGenerateAlbumInfo(randomizedPlaylist);
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
        <option value="rock">Rock</option>
        <option value="metal">Metal</option>
        <option value="rap">Rap</option>
        <option value="punk">Punk</option>
        <option value="pop">Pop</option>
        <option value="doom metal">Doom Metal</option>
        <option value="jazz">Jazz</option>
        <option value="citypop">City Pop</option>
      </select>

      <button onClick={handleGeneratePlaylist}>Create Playlist</button>

      <ul>
        {playlist.map((track, index) => (
          <li key={track.url}>
            {track.name} - {track.artist.name} -{" "}
            {trackInfos[index]?.album?.title || "No data"}
            {trackInfos[index]?.wiki?.published || "No data"}
            <img
              src={
                trackInfos[index]?.album?.image.find(
                  (img) => img.size === "medium"
                )["#text"]
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
