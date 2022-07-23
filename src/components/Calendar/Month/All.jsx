import React from 'react'
import CalendarAllDay from '../Day/All'
import styles from './styles.module.css'

const CalendarAllMonth = ({ month }) => {
    return (
        <div className={styles.month}>
            {month.map((row, i) => (
                <div className={styles.monthContainer} key={i}>
                    {row.map((day, idx) => (
                        <CalendarAllDay day={day} key={idx} rowIdx={i} />
                    ))}
                </div>
            ))}

        </div>
    )
}

export default CalendarAllMonth