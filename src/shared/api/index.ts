import { useEffect, useState, useRef } from "react";

export const useAudioPlayer = (audioUrl: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const progressRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
  
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current?.duration || 0);
      };
  
      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
        if (progressRef.current) {
          progressRef.current.value = audioRef.current?.currentTime.toString() || "0";
        }
      };
  
      audioRef.current.onended = () => {
        if (repeat) {
          audioRef.current?.play();
        } else {
          setIsPlaying(false);
        }
      };
  
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [audioUrl, repeat]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const toggleRepeat = () => {
    setRepeat((prev) => !prev);
  };

  const shareAudio = async () => {
    if (navigator.share && audioUrl) {
      try {
        const currentPageUrl = window.location.href;
        await navigator.share({
          title: "Слушай этот трек!",
          text: "Попробуй этот аудиотрек!",
          url: `${currentPageUrl}`,
        });
      } catch (error) {
        console.error("Ошибка при шеринге:", error);
      }
    }
  };
  

  return {
    isPlaying,
    togglePlayPause,
    handleSeek,
    progressRef,
    duration,
    currentTime,
    repeat,
    toggleRepeat,
    shareAudio,
  };
};
