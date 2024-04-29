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
      <div
        onClick={() => handleFilterClick(title)}
        className={classNames(styles.filterButton, styles.btnText)}
      >
        {title}
      </div>
      {isOpen && (
          <ul className={styles.dropDownList}>
            {list.map((item) => (
              <li className={styles.dropDownListItem} key={item}>
                {item}
              </li>
            ))}
          </ul>
        
      )}
    </>
  );
}
