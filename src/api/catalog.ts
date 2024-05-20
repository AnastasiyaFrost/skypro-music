const apiUrl: string = "https://skypro-music-api.skyeng.tech/catalog/selection/";

export async function getPlaylistTracks(id: string) {
  const res = await fetch(apiUrl + id);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
const data = await res.json();
  return data.items;
}