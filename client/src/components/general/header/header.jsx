import React from 'react'
import styles from '../header/header.module.css'

import iconHome from '../../../assets/img/icons/Home.png';
import chatIcon from '../../../assets/img/icons/Chat.png'
import NotificationsIcon from '../../../assets/img/icons/Notifications.png'
import ProfileIcon from '../../../assets/img/icons/Profile.png'
import ShopIcon from '../../../assets/img/icons/shop.png'

function Header() {

    return (

        <header className={styles.header}>
            <div className={styles.header_left}>
                <h1 style={{ fontSize: 21 }}>Coral </h1>
            </div>

            <div>
                <ul className={styles.navbarListItems}>
                    <li className={styles.navbarListItem}><a href="/"><img src={iconHome} height="27px" width="27px" /></a></li>
                    <li className={styles.navbarListItem}><a href="/about"><img src={chatIcon} style={{ marginTop: 4 }} height="19px" width="19px" /></a></li>
                    <li className={styles.navbarListItem}><a href="/account/login"><img src={ShopIcon} height="20px" width="20px" /></a></li>
                    <li className={styles.navbarListItem}><a href="/community/chat"><img src={NotificationsIcon} height="27px" width="27px" /></a></li>
                    <li className={styles.navbarListItem}><a href="/blog/writeblog"><img src={ProfileIcon} height="20px" width="20px" /></a></li>
                    <li className={styles.navbarListItem}><button className={styles.btnBlackMed}>Get Started</button></li>
                </ul>
            </div>
        </header>
    )

}

export default Header