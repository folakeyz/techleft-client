import React, { useEffect } from 'react'
import styles from "./styles.module.css"
import { useSelector, useDispatch } from 'react-redux'
import { getMe } from '../../redux/actions/userActions'

const Header = ({ pageTitle }) => {
    const dispatch = useDispatch()

    const userProfile = useSelector((state) => state.userProfile);
    const { user = {} } = userProfile;

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])
    return (
        <div className={styles.header}>
            <div className={styles.pageTitle}><h3>{pageTitle}</h3></div>
            <div className={styles.profile}>
                {/* <div className={styles.dp}></div> */}
                <div className={styles.name}>Hello {user.first_name ? user.first_name : user.email}!</div>
            </div>
        </div>
    )
}

export default Header