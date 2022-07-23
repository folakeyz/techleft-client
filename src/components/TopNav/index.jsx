import React from 'react'
import styles from './styles.module.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const TopNav = () => {
    return (
        <div className={styles.top}>
            <Link to="/">
            <div className={styles.logoContainer}>
            <img src={logo} alt="TechLeft" />
            <h3>TECHLEFT</h3>
            </div>
            </Link>
           <div className='btnContainer'>
            <Link to="/request-a-demo" className='btnTable color2'>Request a Demo</Link>
            <Link to="/login" className='btnTable color1'>Login</Link>
           </div>
          
        </div>
    )
}

export default TopNav