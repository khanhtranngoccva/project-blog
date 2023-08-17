import React from 'react';
import styles from './homepage.module.css';
import AllPosts from "@/components/AllPosts";

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>

      <AllPosts></AllPosts>
    </div>
  );
}

export default Home;
