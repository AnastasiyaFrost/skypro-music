import classNames from "classnames";
import Filter from "../Filter/Filter";
import Search from "../Search/Search";
import Track from "../Track/Track";
import styles from "./MainCenter.module.css";
import Playlist from "../Playlist/Playlist";


export default function MainCenter () {
    return (
      <div className={styles.mainCenterblock}>
        <Search />
        <h2 className={styles.centerblockH2}>Треки</h2>
        <Filter />
        <Playlist/>
      </div>
    );
}