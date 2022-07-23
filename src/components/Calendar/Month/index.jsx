import React from 'react'
import CalendarDay from '../Day'
import styles from './styles.module.css'

const CalendarMonth = ({ month, client }) => {
    return (
        <div className={styles.month}>
            {month.map((row, i) => (
                <div className={styles.monthContainer} key={i}>
                    {row.map((day, idx) => (
                        <CalendarDay day={day} key={idx} rowIdx={i} client={client} />
                    ))}
                </div>
            ))}

        </div>
    )
}

export default CalendarMonth