import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchSong } from "./model";

function TrackSearch() {
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: searchSong,
    onSuccess: (data) => navigate(`/song/${data.id}`, { state: data }),
    onError: () => setError("Произошла ошибка. Попробуйте снова."),
  });

  return (
    <div className="flex flex-col w-[100%] h-[80vh] items-center justify-center gap-4 text-neutral-900">
      <h2 className="text-2xl">Введите ссылку на песню</h2>
      <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(audioUrl); }} className="flex gap-4 relative w-[100%] max-w-[700px]">
        <textarea
          value={audioUrl}
          onChange={(e) => setAudioUrl(e.target.value)}
          placeholder="Введите ссылку на трек"
          className="flex w-[100%] text-wrap flex-1 px-2 pt-[4px] pb-[30px] border rounded-xl outline-none text-sm text-neutral-900 text-start"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 !text-white rounded absolute right-2 bottom-2">
          +
        </button>
      </form>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default TrackSearch;
