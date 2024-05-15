'use client'

import { useAppSelector } from "@/hooks";
import styles from "./Filter.module.css";
import FilterItem from "./FilterItem/FilterItem";
import { useState } from "react";

const filters = [
  {
    title: "Исполнителю",
    value: "author",
  },
  { title: "Жанру", value: "genre" },
  { title: "Году выпуска", value: "order" },
];
export const order = [
  'по умолчанию',
  "сначала новые",
  "сначала старые"
];

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const authorsList = useAppSelector(
    (state) => state.playlist.filterOptions.author
  );
  const genresList = useAppSelector(
    (state) => state.playlist.filterOptions.genre
  );
  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  }
  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      {/* {filters.map((filter) => (
        <FilterItem
          key={filter.title}
          isOpen={activeFilter === filter.title}
          handleFilterClick={handleFilterClick}
          title={filter.title}
          value={filter.value}
        />
      ))} */}
      <FilterItem
        isOpen={activeFilter === filters[0].title}
        handleFilterClick={handleFilterClick}
        title={filters[0].title}
        value={"author"}
        filtersCount={authorsList.length}
      />
      <FilterItem
        isOpen={activeFilter === filters[1].title}
        handleFilterClick={handleFilterClick}
        title={filters[1].title}
        value={"genre"}
        filtersCount={genresList.length}
      />
      <FilterItem
        isOpen={activeFilter === filters[2].title}
        handleFilterClick={handleFilterClick}
        title={filters[2].title}
        value={"order"}
        filtersCount={0}
      />
    </div>
  );
}
