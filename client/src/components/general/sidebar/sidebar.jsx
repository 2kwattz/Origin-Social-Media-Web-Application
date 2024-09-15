import React from "react";
import styles from "../../../App.module.css"

function Sidebar() {

    return (
        <React.Fragment>

            <ul className={styles.sidebarList}>
                <li className={styles.sidebarListItem}>My Profile </li>
                <li className={styles.sidebarListItem}>Groups</li>
                <li className={styles.sidebarListItem}>Marketplace</li>
                <li className={styles.sidebarListItem}>Trending</li>
                <li className={styles.sidebarListItem}>Chatrooms</li>
                <li className={styles.sidebarListItem}>Settings</li>

            </ul>
        </React.Fragment>
    )
}

export default Sidebar