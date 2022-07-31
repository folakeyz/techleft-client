import React from "react";
import { TopNav, Hero, Features } from "../../components";
import styles from "./styles.module.css";
// import { Link } from "react-router-dom";
import image from "../../assets/1.jpeg";
import image2 from "../../assets/2.jpeg";
import image3 from "../../assets/3.jpeg";
import image4 from "../../assets/4.jpeg";

const Home = () => {
  return (
    <div className={styles.app}>
      <TopNav />
      <Hero />
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>Features</h1>
          <div className={styles.features}>
            <Features
              title="CROSS-INSTITUTIONAL AVAILABILITY ANALYSIS"
              text="Techleft HR comprehensively alerts users (long-term and in-home care employers) how their patients/clients could go unattended for a time ranging from minutes to hours."
            />
            <Features
              title="SUPPORT WORKER DOUBLE-BOOKING PREVENTION"
              text="One shift at a time helps ensure that every person needing caregiving has a qualified support worker to handle care administration, mainly for care administered at varying locations. With the double-booking alerts comes possibilities for prevention."
            />
            <Features
              title="ALL-IN-ONE PLATFORM"
              text="Everything you need in a scheduling platform is available in Techleft HR app: onboard clients and support workers; match dedicated support workers to clients; schedule; in-shift messaging; get alerts that call for attention; and more."
            />
          </div>
        </div>
        <div>
          <h1 className={styles.title}>Benefits</h1>
          <div className={styles.benefits}>
            <div className={styles.bImg}>
              <img src={image2} alt="Benefits" />
            </div>
            <div className={styles.bText}>
              <h1>Reduced patient/client abandonment and neglect</h1>
              <p>
                Nevertheless, support workers work for more than one employer in
                the industry, but there is no justification for missed visits.
                Patient/client abandonment and neglect are proven to cause
                preventable injuries and, even more problematic, preventable
                deaths. Techleft HR aids with a drastic reduction of
                patient/client abatement and neglect.
              </p>
            </div>
          </div>

          {/*  */}
          <div className={styles.benefits}>
            <div className={styles.bImg}>
              <img src={image} alt="Benefits" />
            </div>
            <div className={styles.bText}>
              <h1>Improved quality and delivery of caregiving</h1>
              <p>
                Employers in the industry would have solid reliability built on
                the benefits of using Techleft HR app. Health enterprises in the
                industry, including health authorities, hospitals, healthcare
                service providers, health insurance providers, and benefit
                providers, can benefit from our HRM solutions to give customers
                the best experience that matches or meet expectations.
              </p>
            </div>
          </div>

          {/*  */}

          <div className={styles.benefits}>
            <div className={styles.bImg}>
              <img src={image4} alt="Benefits" />
            </div>
            <div className={styles.bText}>
              <h1>Secure patient/client data</h1>
              <p>
                Individuals, families, health authorities, long-term care, and
                in-home care homes/agencies can have secured health data and
                share health information based on compliance with the necessary
                procedures. Techleft HR aids them in making more informed
                decisions on or around long-term and in-home care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
