import { useParams } from "react-router-dom";
import { useAudioPlayer } from "../../../shared/api";
import { apple_music, example, pause, play, repeat_image, share, spinner, spotify, vk, yandex_music } from "../../../shared/assets";
import { useQuery } from "@tanstack/react-query";
import { fetchSong } from "./model";

function Song() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["song", id],
    queryFn: () => fetchSong(id),
    enabled: !!id,
  });

  const song = data || {};
  const { title, artist, cover_url, preview_audio_url, apple_music_url, vk_music_url, yandex_music_url, spotify_url } = song;

  const {
    isPlaying,
    togglePlayPause,
    handleSeek,
    progressRef,
    duration,
    currentTime,
    repeat,
    toggleRepeat,
    shareAudio,
  } = useAudioPlayer(preview_audio_url || "");

  if (isLoading) return <div className="flex flex-col items-center justify-center"><img className="w-[50px] h-[50px]" src={spinner} /></div>;
  if (error) return <div className="flex flex-col items-center justify-center"><p className="text-black">Error loading song</p></div>;

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 mb-2 rounded-xl">
      <div className="flex flex-col items-center justify-center gap-4 max-w-[255px]">
        <img
          src={cover_url || example}
          alt="Cover"
          className="w-[355px] object-cover rounded-xl"
        />
        <div>
          <p className="font-[Inter, sans-serif] text-xl text-neutral-950 font-semibold">
            {title || "Название трека"}
          </p>
          <p className="font-[Inter, sans-serif] text-[22px] text-neutral-950 font-normal">
            {artist || "Исполнитель"}
          </p>
        </div>
        <input ref={progressRef} type="range" min="0" max={duration} step="0.1" value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 rounded-lg appearance-none bg-gradient-to-r from-gray-100 to-gray-200"
          style={{
            background: `linear-gradient(to right, #f0f0f0 ${(currentTime / duration) * 100
              }%, rgb(225, 223, 223) ${(currentTime / duration) * 100}%)`,
          }}
        />
        <div className="flex gap-12">
          <button onClick={shareAudio} className="w-[45px] h-[45px] flex items-center justify-center bg-neutral-500 text-white rounded-full">
            <img className="w-[20px] h-[20px]" src={share} alt="Share" />
          </button>
          <button onClick={togglePlayPause} className="w-[45px] h-[45px] flex items-center justify-center bg-neutral-500 text-white rounded-full">
            <img className="w-[20px] h-[20px]" src={isPlaying ? pause : play} />
          </button>
          <button onClick={toggleRepeat} className={`w-[45px] h-[45px] flex items-center justify-center rounded-full ${repeat ? "bg-neutral-400" : "bg-neutral-500"} text-white`}><img className="w-[20px] h-[20px]" src={repeat_image} /></button>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 mt-4 mb-2 p-4 rounded-sm">
          {apple_music_url && <div className="flex gap-4 items-center justify-between max-w-[460px] min-w-[270px] sm:min-w-[570px] w-[100%] text-black">
            <div className="flex gap-10 items-center">
              <img className="w-[30px] h-[30px]" src={apple_music} />
              <p className="font-semibold">Apple Music</p>
            </div>
            <a href={apple_music_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm px-4 py-1 bg-neutral-900 hover:bg-neutral-700 !text-white rounded">Слушать</a></div>}
          {/* {deezer_url && <div className="flex gap-4 items-center justify-between w-[360px] text-black"><img className="w-[30px] h-[30px]" src={apple_music} /> Deezer <a href={deezer_url} target="_blank" rel="noopener noreferrer" className="ml-2 px-4 py-1 text-sm bg-blue-500 !text-white hover:bg-blue-600 rounded">Слушать</a></div>} */}
          {spotify_url && <div className="flex gap-4 items-center justify-between max-w-[460px] min-w-[270px] sm:min-w-[570px] w-[100%] text-black">
            <div className="flex gap-10 items-center w-[210px]">
              <img className="w-[30px] h-[30px]" src={spotify} /> <p className="font-semibold">Spotify</p>
            </div>
            <a href={spotify_url} target="_blank" rel="noopener noreferrer" className="ml-2 px-4 py-1 text-sm bg-neutral-900 !text-white hover:bg-neutral-700 rounded">Слушать</a></div>}
          {vk_music_url && <div className="flex gap-4 items-center justify-between max-w-[460px] min-w-[270px] sm:min-w-[570px] w-[100%] text-black">
            <div className="flex gap-10 items-center">
              <img className="w-[30px] h-[30px]" src={vk} />
              <p className="font-semibold">ВК Музыка</p>
            </div>
            <a href={vk_music_url} target="_blank" rel="noopener noreferrer" className="ml-2 px-4 py-1 text-sm bg-neutral-900 !text-white hover:bg-neutral-700 rounded">Слушать</a></div>}
          {yandex_music_url && <div className="flex gap-4 items-center justify-between max-w-[460px] min-w-[270px] sm:min-w-[570px] w-[100%] text-black">
            <div className="flex gap-10 items-center">
              <img className="w-[30px] h-[30px]" src={yandex_music} /><p className="font-semibold">Яндекс Музыка</p>
            </div>
            <a href={yandex_music_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm px-4 py-1 bg-neutral-900 hover:bg-neutral-700 !text-white rounded">Слушать</a></div>}
        </div>
      </div>
    </div>
  );
}

export default Song;