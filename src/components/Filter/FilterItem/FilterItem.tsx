import { useAppDispatch, useAppSelector } from "@/hooks";
import styles from "./FilterItem.module.css";
import classNames from "classnames";
import { trackType } from "@/types";
import { order } from "../Filter";
import { setFilters } from "@/store/features/playlistSlice";

type FilterItemType = {
  title: string;
  value: "author" | "genre" | "order";
  handleFilterClick: (newFilter: string) => void;
  isOpen: boolean;
};

export default function FilterItem({
  title,
  value,
  handleFilterClick,
  isOpen,
}: FilterItemType) {
  const playlist = useAppSelector((state) => state.playlist.defaultPlaylist);
const authorsList = useAppSelector((state)=>state.playlist.filterOptions.author);
const dispatch = useAppDispatch();
  const getFilterList = () => {
    if (value !== "order") {
      const filterSet = new Set(
        playlist?.map((track: trackType) => track[value]) || []
      );
      return Array.from(filterSet);
    }
    return order;
  };
  getFilterList();

  const toggleFilter = (item: string) => {
    dispatch(
      setFilters({
        author: authorsList.includes(item)
          ? authorsList.filter((el) => el !== item)
          : [...authorsList, item],
      })
    );
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div
          onClick={() => handleFilterClick(title)}
          className={classNames(styles.filterButton, styles.btnText, {
            [styles.active]: isOpen,
          })}
        >
          {title}
        </div>
        {isOpen && (
          <div className={styles.filterWrapper}>
            <ul className={styles.dropDownList}>
              {getFilterList().map((item, index) => (
                <li onClick={(item)=>toggleFilter}
                  className={styles.dropDownListItem}
                  key={item}
                  tabIndex={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
