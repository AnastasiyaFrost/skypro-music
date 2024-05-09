"use client";
import Navigation from "@/components/Navigation/Navigation";
import Bar from "@/components/Bar/Bar";
import Sidebar from "@/components/Sidebar/Sidebar";
import MainCenter from "@/components/MainCenter/MainCenter";
import styles from "./page.module.css";
import { useState } from "react";
import { trackType } from "@/types";

export default function Home() {
  const [track, setTrack] = useState<null | trackType>(null);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <MainCenter setTrack={setTrack} />
          <Sidebar />
        </main>
        {track && <Bar track={track} />}
        <footer className="footer" />
      </div>
    </div>
  );
}
