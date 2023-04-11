import type { Component } from "solid-js";

import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Lines } from "./components/Lines";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Header />
      <Lines />
    </div>
  );
};

export default App;
