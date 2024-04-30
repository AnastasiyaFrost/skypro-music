import classNames from "classnames";
import Track from "../Track/Track";
import styles from "./Playlist.module.css";
import { getTracks } from "@/api/tracks";
import { trackType } from "@/types";
import ErrorPage from "@/app/error";

export default async function Playlist() {
  let tracks: trackType[];

  try {
    tracks = await getTracks(); 
  } catch (error:any) {
    return <ErrorPage error={error} reset={() => {}} />;
  }
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
          <Track
            key={track.id}
            name={track.name}
            author={track.author}
            album={track.album}
          />
        ))}
        {/* <Track /> */}
      </div>
    </div>
  );
}
