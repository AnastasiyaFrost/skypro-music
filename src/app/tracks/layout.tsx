import Navigation from "@/components/Navigation/Navigation";
import Bar from "@/components/Bar/Bar";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./page.module.css";
import Search from "@/components/Search/Search";
import Filter from "@/components/Filter/Filter";

export default function TrackLayout ({children}:{children: React.ReactNode}) {
    

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <div className={styles.mainCenterblock}>
            <Search />
            <h2 className={styles.centerblockH2}>Треки</h2>
            <Filter/>
            {children}
          </div>
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer" />
      </div>
    </div>
  );
}
    
