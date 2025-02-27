import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useTrackSearch = () => {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (url: string) => {
      const response = await fetch("https://tracklinker.ru/track", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error("Трек не найден");

      return response.json();
    },
    onSuccess: (data) => {
      navigate("/song", { state: { trackData: data } });
    },
  });

  return { searchTrack: mutate, isPending, error };
};
