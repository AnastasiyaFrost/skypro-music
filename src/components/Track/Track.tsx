"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import styles from "./Track.module.css";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import { trackType } from "@/types";

type PlaylistItemType = {
  track: trackType;
  tracks: trackType[];
};

export default function Track({ track, tracks }: PlaylistItemType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const { id, name, author, album, duration_in_seconds } = track;
  const isPlaying = currentTrack ? currentTrack.id === id : false;
  const dispatch = useAppDispatch();
  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track, tracks }));
  };
  return (
    <>
      <div onClick={handleTrackClick} className={styles.playlistItem}>
        <div className={styles.playlistTrack}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-note" />
              </svg>
            </div>
            <div>
              <span className={styles.trackTitleLink}>
                {name} <span className={styles.trackTitleSpan} />
              </span>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <span className={styles.trackAuthorLink}>{author}</span>
          </div>
          <div className={styles.trackAlbum}>
            <span className={styles.trackAlbumLink}>{album}</span>
          </div>
          <div>
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-like" />
            </svg>
            <span className={styles.trackTimeText}>{duration_in_seconds}</span>
          </div>
        </div>
      </div>
    </>
  );
}
