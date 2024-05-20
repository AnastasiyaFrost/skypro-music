const apiUrl: string = "https://skypro-music-api.skyeng.tech/catalog/track/";

export async function getTracks() {
  const res = await fetch(
    apiUrl+"all/"
  );

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  return res.json();
}

