import styles from "./FilterItem.module.css";
import classNames from "classnames";

type FilterItemType = {
  title: string;
  list: string[];
  handleFilterClick: (newFilter: string) => void;
  isOpen: boolean;
};

export default function FilterItem({
  title,
  list,
  handleFilterClick,
  isOpen,
}: FilterItemType) {
  return (
    <>
      <div className={styles.wrapper}>
        <div
          onClick={() => handleFilterClick(title)}
          className={classNames(styles.filterButton, styles.btnText, {[styles.active]:isOpen})}
        >
          {title}
        </div>
        {isOpen && (
          <div className={styles.filterWrapper}>
            <ul className={styles.dropDownList}>
              {list.map((item, index) => (
                <li className={styles.dropDownListItem} key={item} tabIndex={index}>
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
