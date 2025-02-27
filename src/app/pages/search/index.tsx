import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TrackSearch() {
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://tracklinker.ru/track", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ url: audioUrl }),
      });

      if (!response.ok) throw new Error("Трек не найден");

      const data = await response.json();
      console.log(data)
      navigate(`/song/${data.id}`, { state: data });
    } catch (error) {
      setError("Произошла ошибка. Попробуйте снова.");
    }
  };

  return (
    <div className="flex flex-col w-[100%] h-[80vh] items-center justify-center gap-4 text-neutral-900">
      <h2 className="text-2xl">Введите ссылку на песню</h2>
      <form onSubmit={handleSubmit} className="flex gap-4 relative w-[100%] max-w-[700px]">
        <textarea
          value={audioUrl}
          onChange={(e) => setAudioUrl(e.target.value)}
          placeholder="Введите ссылку на трек"
          className="flex w-[100%] text-wrap flex-1 px-2 pt-[4px] pb-[30px] border rounded-xl outline-none text-sm text-neutral-900 text-start"
        />
        <button type="submit" className="bg-blue-500 !text-white rounded absolute right-2 bottom-2">
          +
        </button>
      </form>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default TrackSearch;
