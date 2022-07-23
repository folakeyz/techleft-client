import React from "react";
import { Button, TopNav } from "../../components";
import styles from "./styles.module.css";
import { Link,} from "react-router-dom";
import image from '../../assets/image.webp'


const Home = () => {
  return (
    <div className={styles.app}>
      <TopNav />
      <div className={styles.container}>
        <div className={styles.textContainer}>
        <h3>
              K<span className="danger">NO</span>W MISSED VISITS 
            </h3>
            <h4>
            and cross-institutional support WORKERS DOUBLE-BOOKING?</h4>
            <p>HRTECHLEFT is a Long-term and In-home Care Collaborative Remote Monitoring platform.</p>
            <div className="btnContainer">
                <Link to="/request-a-demo" className="btn color2">Request a Demo</Link>&nbsp;&nbsp;&nbsp;
                <a href="https://www.techleft.com" className="btn color1">Learn More</a>
            </div>
            </div>
        <div className={styles.imageContainer}>
         <img src={image} alt="Image" />
          
        </div>
      </div>
    </div>
  );
};

export default Home;
