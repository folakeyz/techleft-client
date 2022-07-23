import dayjs from 'dayjs'
import React from 'react'
// import GlobalContext from '../../../context/GlobalContext'
import styles from './styles.module.css'

const CalendarHeader = ({ monthNumber = 0 }) => {
    // const { monthIndex, setMonthIndex } = useContext(GlobalContext)

    // function handlePrevMonth() {
    //     setMonthIndex(monthIndex - 1)
    // }
    // function handleNextMonth() {
    //     setMonthIndex(monthIndex + 1)
    // }
    // function handleResetMonth() {
    //     setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month())
    // }
    return (
        <div className={styles.header}>
            {/* <button onClick={handleResetMonth}>Today</button> */}
            {/* <button onClick={handlePrevMonth}>Previous</button> */}
            <p>{dayjs(new Date(dayjs().year(), parseInt(monthNumber))).format("MMMM YYYY")}</p>
            {/* <button onClick={handleNextMonth}>Next</button> */}
        </div>
    )
}

export default CalendarHeader