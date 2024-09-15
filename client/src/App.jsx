import React from "react";
import Header from "./components/general/header/header";
import styles from "./App.module.css"
import Sidebar from "./components/general/sidebar/sidebar";

function App() {

    return <React.Fragment>

        <Header />
        <div className={styles.bodyWrapper}>

            <Sidebar />
        </div>


    </React.Fragment>
}

export default App;