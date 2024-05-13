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
  filtersCount: number;
};

export default function FilterItem({
  title,
  value,
  handleFilterClick,
  isOpen,
  filtersCount
}: FilterItemType) {
  const playlist = useAppSelector((state) => state.playlist.defaultPlaylist);
  const authorsList = useAppSelector(
    (state) => state.playlist.filterOptions.author
  );
  const genresList = useAppSelector(
    (state) => state.playlist.filterOptions.genre
  );
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
    if (value === "author") {
      dispatch(
        setFilters({
          author: authorsList.includes(item)
            ? authorsList.filter((el) => el !== item)
            : [...authorsList, item],
        })
      );
    } else if (value === "genre") {
      dispatch(
        setFilters({
          genre: genresList.includes(item)
            ? genresList.filter((el) => el !== item)
            : [...genresList, item],
        })
      );
    }
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
          {filtersCount > 0 && (
            <div className={styles.selectedFilters}>{filtersCount}</div>
          )}
        </div>
        {isOpen && (
          <div className={styles.filterWrapper}>
            <ul className={styles.dropDownList}>
              {getFilterList().map((item, index) =>
                authorsList.includes(item) || genresList.includes(item) ? (
                  <li
                    onClick={() => toggleFilter(item)}
                    className={styles.dropDownListItemfocus}
                    key={item}
                    tabIndex={index}
                  >
                    {item}
                  </li>
                ) : (
                  <li
                    onClick={() => toggleFilter(item)}
                    className={styles.dropDownListItem}
                    key={item}
                    tabIndex={index}
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
