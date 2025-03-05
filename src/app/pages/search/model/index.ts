export async function searchSong(url: string) {
  const response = await fetch("https://tracklinker.ru/track", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) throw new Error("Трек не найден");
  return response.json();
}