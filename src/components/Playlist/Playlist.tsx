"use client";
import classNames from "classnames";
import Track from "../Track/Track";
import styles from "./Playlist.module.css";
import { getTracks } from "@/api/tracks";
import { trackType } from "@/types";
import ErrorPage from "@/app/error";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setDefaultPlaylist } from "@/store/features/playlistSlice";
import { useEffect, useState } from "react";

export default function Playlist({ tracks, playlist }: { tracks: trackType[]; playlist: trackType[]}) {
  // const dispatch = useAppDispatch();
  // const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks);
  // const [tracks, setTracks] = useState<trackType[]>([]);

  // useEffect(() => {
  //   getTracks()
  //     .then((tracksData) => {
  //       dispatch(setDefaultPlaylist(tracksData));
  //       setTracks(tracksData);
  //     })
  //     .catch((error) => {
  //       return <ErrorPage error={error} reset={() => {}} />;
  //     });
  // }, [dispatch]);

  return (
    
    <div className={styles.centerblockContent}>
      <div className={styles.contentTitle}>
        <div className={classNames(styles.playlistTitleCol, styles.col01)}>
          Трек
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col02)}>
          Исполнитель
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col03)}>
          Альбом
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col04)}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>
      <div className={styles.contentPlaylist}>
        {tracks.map((track) => (
          <Track key={track.id} track={track} tracks={tracks} />
        ))}
      </div>
    </div>
  );
}
