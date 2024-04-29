'use client'

import styles from "./Filter.module.css";
import FilterItem from "./FilterItem/FilterItem";
import { useState } from "react";

const filters = [
  { title: "Исполнителю", list: ["Иван", "Даша"] },
  { title: "Году выпуска", list: ["2022", "2024"] },
  { title: "Жанру", list: ["k-pop", "шансон"] },
];

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  }
  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filters.map((filter)=> (<FilterItem key={filter.title}
        isOpen={activeFilter === filter.title}
        handleFilterClick={handleFilterClick}
        title={filter.title}
        list={filter.list}
      />))}
    </div>
  );
}
