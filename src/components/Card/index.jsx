import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const Card = ({ Icon, count, title, color, primary, url }) => {
    return (
        <Link to={url} className={styles.cardContainer}>
            <div className={styles.textContainer}>
                <p>{title}</p>
                <h2>{count}</h2>
            </div>
            <div className={styles.circleContainer}>
                <div className={`${styles.oCircle} ${styles[primary]}`}>
                    <div className={`${styles.circle} ${styles[color]}`}>
                        {Icon && <Icon />}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card