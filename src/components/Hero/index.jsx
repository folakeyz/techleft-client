import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className={styles.hero}>
       <div className={styles.textContainer}>
        <h5 className="danger">SOLUTION</h5>
        <h3>Human Resource Management (HRM)</h3>
          <p>
            K<span className="danger">NO</span>W MISSED VISITS
          and cross-institutional support WORKERS DOUBLE-BOOKING?</p><br />
          <p>
            HRTECHLEFT is a Long-term and In-home Care Collaborative Remote
            Monitoring platform.
          </p>
          <div className="btnContainer">
            <Link to="/request-a-demo" className="btn white">
              Request a Demo
            </Link>
            &nbsp;&nbsp;&nbsp;
            <a href="https://www.techleft.com" className="btn color1">
              Learn More
            </a>
          </div>
        </div>
    </div>
  )
}

export default Hero
