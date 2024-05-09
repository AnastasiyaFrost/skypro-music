import Filter from "../Filter/Filter";
import Search from "../Search/Search";
import styles from "./MainCenter.module.css";
import Playlist from "../Playlist/Playlist";
import { PlaylistType } from "@/types";

export default function MainCenter({ setTrack }: PlaylistType) {
  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter />
      <Playlist setTrack={setTrack} />
    </div>
  );
}
