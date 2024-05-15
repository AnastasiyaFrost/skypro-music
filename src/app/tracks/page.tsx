import { getTracks } from "@/api/tracks";
import Playlist from "@/components/Playlist/Playlist";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setDefaultPlaylist } from "@/store/features/playlistSlice";
import { trackType } from "@/types";
import { useEffect, useState } from "react";
import ErrorPage from "../error";

export default function MainTracksPage() {
    const dispatch = useAppDispatch();
    const filteredTracks = useAppSelector(
      (state) => state.playlist.filteredTracks
    );
    const [tracks, setTracks] = useState<trackType[]>([]);

    useEffect(() => {
      getTracks()
        .then((tracksData) => {
          dispatch(setDefaultPlaylist(tracksData));
          setTracks(tracksData);
        })
        .catch((error) => {
          return <ErrorPage error={error} reset={() => {}} />;
        });
    }, [dispatch]);
  return (
    <Playlist tracks={filteredTracks} playlist={tracks}/>
  );
}
