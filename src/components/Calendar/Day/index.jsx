import dayjs from 'dayjs'
import React, { useContext, useState, useEffect } from 'react'
import GlobalContext from '../../../context/GlobalContext'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import { Modal } from '../../'
const CalendarDay = ({ day, rowIdx, client }) => {
    const userProfile = useSelector((state) => state.userProfile);
    const { user = {} } = userProfile;
    const [dayEvents, setDayEvents] = useState([])
    const [open, setOpen] = useState(false)

    const { setDaySelected, setShowEventModal, events, setSelectedEvent } = useContext(GlobalContext)
    useEffect(() => {

        const event = user.is_staff === true ? events && events.filter((evt) => dayjs(parseInt(evt.date)).format("DD-MM-YY") === day.format("DD-MM-YY") && evt.client.id === parseInt(client)) :
            events && events.filter((evt) => dayjs(parseInt(evt.date)).format("DD-MM-YY") === day.format("DD-MM-YY") && evt.client && evt.client.id === parseInt(client))

        setDayEvents(event)
    }, [events, day, user, client])
    function getCurrentDay() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? styles.badge : ""
    }

    const userClick = (evt, id) => {
        if (id === user.id) {
            setShowEventModal(true)
            setSelectedEvent(evt)
        }

    }
    return (
        <div className={styles.day} onClick={user.is_staff === true ? () => {
            setDaySelected(day)
            setShowEventModal(true)
        } : null}>
            <div className={styles.heading}>
                {rowIdx === 0 && <p>{day.format("ddd").toUpperCase()}</p>}
                <p className={getCurrentDay()}>{day.format("DD")}</p>
            </div>
            {dayEvents && dayEvents.map((evt, idx) => (
                <div key={idx} className={`${styles.label} ${styles[evt.status]}`}
                    onClick={user.is_staff === true ? () => setSelectedEvent(evt) : () => userClick(evt, evt.employee.user.id)}
                >
                    {user.is_staff === false && <h4 style={{ fontSize: "1.3rem" }}><b>{evt.client && evt.client.name}</b></h4>}
                    <p><b>{evt.employee && evt.employee.user.first_name + " " + evt.employee.user.last_name}</b></p>
                    <p>{evt.start_time + "-" + evt.end_time}</p>
                </div>
            )).slice(0, 2)}
            {dayEvents && dayEvents.length > 2 && <div className={styles.plus}><span onClick={() => setOpen(true)}>+{dayEvents.length - 2} shift(s)</span></div>}

            <Modal
                isVisible={open}
                title={"Events"}
                size="xl"
                content={
                    <div className="techleft__InputFlex">

                        {dayEvents && dayEvents.map((evt, idx) => (
                            <div key={idx} className={styles.label}
                                onClick={user.is_staff === true ? () => setSelectedEvent(evt) : () => userClick(evt)}
                            >
                                <p><b>{evt.employee && evt.employee.user.first_name + " " + evt.employee.user.last_name}</b></p>
                                <p>{evt.start_time + "-" + evt.end_time}</p>
                            </div>
                        ))}
                    </div>
                }
                onClose={() => setOpen(false)}
            />
        </div>
    )
}

export default CalendarDay