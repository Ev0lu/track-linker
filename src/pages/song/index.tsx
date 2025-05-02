import React, { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';
import { $song, $error, setSongId, submitSongLink } from './model/index'; // Импортируем наши сторы и события
import { apple_music, apple_music_about, deezer, example, find_track, pause, play, repeat_image, share, spinner, spotify, vk, yandex_music } from "../../shared/assets";
import { useAudioPlayer } from '../../shared/api';

function Song() {
  const { trackId } = useParams();
  const navigate = useNavigate();

  const song = useUnit($song);
  const error = useUnit($error);

  const [audioUrl, setAudioUrlState] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (trackId && trackId !== '1') {
      setSongId(trackId);
    }
  }, [trackId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSongLink(link); 
  };

  useEffect(() => {
    let trackData;
    if (song?.data) {
      trackData = song.data;
    } else if (song?.result) {
      trackData = song.result;
    }

    if (trackData && trackData.track_preview?.file_url && audioUrl !== trackData.track_preview.file_url) {
      setAudioUrlState(trackData.track_preview.file_url); 
      
      if (trackData.track_id) {
        navigate(`/song/${trackData.track_id}`);
      }
    }
  }, [song, audioUrl, navigate]);

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
  } = useAudioPlayer(audioUrl);

  const getIconByService = (service: string) => {
    switch (service) {
      case "Yandex":
        return yandex_music; 
      case "Apple":
        return apple_music_about;
      case "Spotify":
        return spotify;
      case "Deezer":
        return deezer;
      default:
        return example;
    }
  };  

  return (
    <div className="flex w-[100%] h-[80%] flex-col items-end justify-end gap-4 pl-8 pr-8 !py-8 rounded-xl">
      <div className='flex w-[100%] items-center justify-center gap-4 text-white !mb-10 relative p-10'>
        {(song?.data || song?.result) && (
          <div className="flex flex-col items-center justify-center gap-4 max-w-[750px] z-10 animate-fadeInUp">
            <div className='flex justify-between items-center gap-15'>
              <div className='flex gap-4 items-center justify-center'>
                <img loading="lazy" src={(song?.data?.album.cover_image || song?.result?.album.cover_image) || example} alt="Cover" className="w-[55px] object-cover rounded-full" />  
                <div className='flex flex-col items-start justify-center'>
                  <p className="font-[Inter, sans-serif] text-[18px] text-white font-semibold">
                    {(song?.data?.album.title || song?.result?.album.title) || 'Track Title'}
                  </p>
                  <p className="font-[Inter, sans-serif] text-[16px] text-white opacity-40 font-normal ">
                    {(song?.data?.artists?.length
                      ? song.data.artists
                      : song?.result?.artists || []
                    ).map((item: any) => (
                      <span key={item.id}>{item.name}</span>
                    ))}
                </p>
                </div>
              </div>
              <div className="hidden sm:flex gap-4 items-center mt-4 flex-wrap">
                {(song?.data?.links || song?.result?.links)?.map((link: any) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[30px] h-[30px] flex items-center justify-center"
                    >
                      <img
                        src={getIconByService(link.music_service)}
                        alt={link.music_service}
                        className="w-[30px]"
                      />
                    </a>
                  ))}
              </div>
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
                background: `linear-gradient(to right,rgb(223, 223, 223) ${(currentTime / duration) * 100}%, rgb(188, 183, 183) ${(currentTime / duration) * 100}%)`,
              }}
            />
            <div className="flex gap-12">
              <button onClick={shareAudio} className="w-[45px] h-[45px] flex items-center justify-center text-white rounded-full">
                <img className="w-[20px] h-[20px]" src={share} alt="Share" />
              </button>
              <button onClick={togglePlayPause} className="w-[45px] h-[45px] flex items-center justify-center text-white rounded-full">
                <img className="w-[20px] h-[20px]" src={isPlaying ? pause : play} />
              </button>
              <button
                onClick={toggleRepeat}
                className={`w-[45px] h-[45px] flex items-center justify-center rounded-full ${!repeat && 'opacity-40'} text-white`}
              >
                <img className="w-[20px] h-[20px]" src={repeat_image} />
              </button>
            </div>
            <div className="flex sm:hidden gap-4 items-center mt-4 flex-wrap">
              {(song?.data?.links || song?.result?.links)?.map((link: any) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[30px] h-[30px] flex items-center justify-center"
                >
                  <img
                    src={getIconByService(link.music_service)}
                    alt={link.music_service}
                    className="w-[30px]"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
        {(song?.data || song?.result) && (<div className="absolute top-0 rounded-3xl w-full h-full bg-[#1A1A1A] opacity-50 z-0 max-w-[650px] animate-fadeInUpSong" />)}
      </div>
      <div className="flex flex-col w-[100%] items-center justify-end gap-4 text-neutral-900">
        <form onSubmit={handleSubmit} className="flex gap-4 relative w-[100%] max-w-[700px]">
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Введите линк на трек"
            className="flex w-[100%] text-wrap flex-1 px-2 pt-1 pb-1 !p-2 !pr-12 !pl-4 border rounded-3xl outline-none text-sm text-start !text-white"
            style={{ backgroundColor: 'transparent' }}
          />
          <button
            type="submit"
            className="!text-white rounded absolute right-2 transition-colors duration-600 ease-in-out"
          >
            <img src={find_track} />
          </button>
        </form>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default Song;
