import React, { useState, useEffect, Suspense } from 'react'
import styles from './styles.module.css'
import { AiTwotoneAppstore, AiFillSetting, AiOutlineTeam, AiOutlineAppstore, AiOutlineClose } from 'react-icons/ai'
import { BsBuilding, BsBezier } from 'react-icons/bs'
import { FaUserShield, FaRegCalendarAlt, FaRegCalendarCheck, FaSignOutAlt, FaChevronDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../redux/actions/userActions'
import logo from '../../assets/logowhite.png'
import { getMyCompany } from '../../redux/actions/companyActions'
import { CircularProgress } from '@chakra-ui/react'

const Navigation = () => {
    const dispatch = useDispatch()
    const [mtoggle, setMToggle] = useState(false)

    const logoutHandler = () => {
        dispatch(userLogout())
    }
    const getCompany = useSelector((state) => state.getCompany);
    const { myCompany = [] } = getCompany;
    const userProfile = useSelector((state) => state.userProfile);
    const { user = {} } = userProfile;

    useEffect(() => {
        dispatch(getMyCompany())
    }, [dispatch])
    return (
        <Suspense fallback={CircularProgress}>
            <div className={styles.bar}>{mtoggle ? <AiOutlineClose onClick={() => setMToggle(false)} /> : <AiOutlineAppstore onClick={() => setMToggle(true)} />}</div>
            <div className={mtoggle ? styles.navMobile : styles.navigation}>
                {/* <div className={styles.logo}>
                    <img src={myCompany[0] ? myCompany[0].logo : logo} alt="company logo" />
                </div> */}
                <div className={styles.url}>
                    <ul>
                        <Link to="/app/dashboard">
                            <li><AiTwotoneAppstore />Dashboard</li>
                        </Link>
                        {user.is_staff === false && <Link to="/app/profile">
                            <li><AiFillSetting />Profile</li>
                        </Link>

                        }
                        {user.is_staff === true &&
                            <>
                                <Link to="/app/rota">
                                    <li><FaRegCalendarAlt />Schedule</li>
                                </Link>
                                {/* <span onClick={() => setRToggle(!rtoggle)}>
                                    <li><FaRegCalendarAlt />
                                        <FaChevronDown style={{ fontSize: "12px", marginLeft: ".3rem" }} />
                                    </li>
                                </span>
                                {rtoggle && <div className={styles.inner}>
                                   
                                    <Link to="/app/schedule">
                                        <li>Manage Schedule</li>
                                    </Link>
                                    <Link to="/app/reports">
                                        <li>Reports</li>
                                    </Link>
                                </div>} */}


                                <Link to="/app/client">
                                    <li><AiOutlineTeam />Client</li>
                                </Link>
                                <Link to="/app/employees">
                                    <li><AiOutlineTeam />Employee</li>
                                </Link>
                                <Link to="/app/branch">
                                    <li><BsBuilding />Branch</li>
                                </Link>
                                <Link to="/app/department">
                                    <li><BsBezier />Department</li>
                                </Link>


                                <Link to="/app/profile">
                                    <li><AiFillSetting />Settings</li>
                                </Link>



                            </>

                        }
                        {user.is_staff === false && <Link to="/app/myclients">
                            <li><FaRegCalendarCheck />Schedule</li>
                        </Link>}




                        <Link to="/#" onClick={logoutHandler}>
                            <li><FaSignOutAlt />Logout</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </Suspense>

    )
}

export default Navigation