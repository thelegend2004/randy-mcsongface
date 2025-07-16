import { useState } from "react";
import { fetchTopTracksByGenre, fetchTrackInfo } from "../api/lastfm";
import { fetchDeezerPreview } from "../api/deezer";
import genres from "../data/genres.json";
import noAlbumCover from "../assets/no-album.svg";

export function PlaylistGenerator() {
  const [genre, setGenre] = useState("rock");
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [trackInfos, setTrackInfos] = useState<any[]>([]);
  const [previews, setPreviews] = useState<
    { previewUrl: string | undefined }[]
  >([]);

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
    <div className="flex flex-col item-center gap-4">
      <h2 className="text-2xl font-semibold text-center">
        Select desired genre
      </h2>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        {genres.map((g: string) => (
          <option key={g} value={g}>
            {g.charAt(0).toUpperCase() + g.slice(1)}
          </option>
        ))}
      </select>

      <button
        className="text-black w-full bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
        onClick={handleGeneratePlaylist}
      >
        Create Playlist
      </button>

      <ul className="flex flex-col item-center mx-auto gap-4 max-w-xl min-w-xl w-ful">
        {playlist.map((track, index) => (
          <li
            className="w-full p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
            key={track.url}
          >
            <p className="mb-2 font-semibold text-center">
              {track.name} - {track.artist.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center ">
              {trackInfos[index]?.album?.title || "No album name"}{" "}
              {trackInfos[index]?.wiki?.published || "No date available"}
            </p>
            <img
              className="mx-auto my-2 rounded-md"
              src={
                trackInfos[index]?.album?.image.find(
                  (img: any) => img.size === "large"
                )["#text"] || noAlbumCover
              }
              alt="Album cover"
            />
            {previews[index] && (
              <audio
                className="w-full mt-4"
                controls
                src={previews[index].previewUrl}
              >
                Your browser does not support the audio element.
              </audio>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
