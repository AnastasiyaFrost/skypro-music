import Image from "next/image";
import styles from "./page.module.css";
import Track from "@/components/Track/Track";
import Navigation from "@/components/Navigation/Navigation";
import Bar from "@/components/Bar/Bar";
import Search from "@/components/Search/Search";
import Filter from "@/components/Filter/Filter";
import Sidebar from "@/components/Sidebar/Sidebar";
import MainCenter from "@/components/MainCenter/MainCenter";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Navigation/>
          <MainCenter/>
          <Sidebar/>
        </main>
        <Bar/>
        <footer className="footer" />
      </div>
    </div>
  );
}
