import React from 'react'
import styles from './styles.module.css'
import vector from '../../assets/appt.jpg'

const Greeting = ({ name }) => {
    let myDate = new Date();
    let hrs = myDate.getHours();

    let greet;

    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';
    return (
        <div className={styles.container}>
            <div className={styles.greet}>
                <div className={styles.text}>
                    <h1>👏{greet}, {name}!</h1>
                    <p>It's Good to see you again</p>
                    <p> K<span>NO</span>W MISSED VISITS and cross-institutional support WORKERS
                        DOUBLE-BOOKING?</p>
                </div>

                <div className={styles.img}>
                    <img src={vector} alt="LMS" />
                </div>
            </div>
        </div>
    )
}

export default Greeting