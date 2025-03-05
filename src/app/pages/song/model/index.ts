export async function fetchSong(id: any) {
    const response = await fetch(`https://tracklinker.ru/track/${id}`);
    if (!response.ok) throw new Error("Failed to fetch song");
    return response.json();
  }