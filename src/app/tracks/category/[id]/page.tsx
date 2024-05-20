import { getPlaylistTracks } from "@/api/catalog";
import Playlist from "@/components/Playlist/Playlist";

type CategoryType = {
    params: {id:string};
}

export default async function CategoryPage({ params }: CategoryType) {
  const playlist = await getPlaylistTracks(params.id);
  return (
    <>
      <Playlist tracks={playlist} playlist={playlist}/>
    </>
  );
};