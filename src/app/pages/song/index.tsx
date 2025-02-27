import { useLocation } from "react-router-dom";
import { useAudioPlayer } from "../../../shared/api";
import { example, pause, play, repeat_image, share } from "../../../shared/assets";

function Song() {
  const location = useLocation();
  const { title, artist, cover_url, preview_audio_url } = location.state || {};

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

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-4 max-w-[355px]">
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
        <input
          ref={progressRef}
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 rounded-lg appearance-none bg-gradient-to-r from-gray-100 to-gray-200"
          style={{
            background: `linear-gradient(to right, #f0f0f0 ${
              (currentTime / duration) * 100
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
          <button onClick={toggleRepeat} className="w-[45px] h-[45px] flex items-center justify-center bg-neutral-500 text-white rounded-full"><img className="w-[20px] h-[20px]" src={repeat_image} /></button>
        </div>
      </div>
    </div>
  );
}

export default Song;
