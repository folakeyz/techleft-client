import React, { useState, useEffect } from "react";
import { Input, Button, TopNav } from "../../../components";
import styles from "../styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { DemoAcct } from "../../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { DEMO_RESET } from "../../../redux/constants/userConstants";
import { FaEnvelope,FaUser,FaMobileAlt,FaMapMarkerAlt,FaBuilding } from "react-icons/fa";

const Demo = () => {
  // Helpers
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form Fields OnChange
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");

  // Login Handler
  const loginHandler = (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !email || !mobile || !location || !industry) {
      toast({
        title: "Warning",
        description: "All Fields are required",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      dispatch(DemoAcct(first_name,last_name,email, mobile, location, industry));
    }
  };

  // Login state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDemo = useSelector((state) => state.userDemo);
  const { loading, success, error } = userDemo;

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: DEMO_RESET });
  }
  if (success) {
    toast({
      title: "Thanks",
      description: "You would be contacted shortly",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: DEMO_RESET });
    navigate("/");
  }

  // redirect on userlogin success
  useEffect(() => {
    if (userInfo) {
      navigate("/app/dashboard");
    }
  }, [navigate, userInfo]);
  return (
    <div className={styles.app}>
      <TopNav />
      <div className={styles.container}>
        <div className={styles.formContainerLg}>
          {/* <div className="padding">
            <h3>
              K<span className="danger">NO</span>W MISSED VISITS and
              cross-institutional support WORKERS DOUBLE-BOOKING?
            </h3>
          </div> */}
          {/* <div className="techleft__InputContainer"> */}
            <form onSubmit={loginHandler}>
                <div className="techleft__InputFlex">
                <Input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={first_name}
                required={true}
                title="First Name"
                Icon={FaUser}
              />
               <Input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={last_name}
                required={true}
                title="Last Name"
                Icon={FaUser}
              />
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required={true}
                title="Email Address"
                Icon={FaEnvelope}
              />
              <Input
                type="tel"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                required={true}
                title="Mobile"
                Icon={FaMobileAlt}
              />
              <Input
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                required={true}
                title="Location"
                Icon={FaMapMarkerAlt}
              />
              <Input
                type="text"
                onChange={(e) => setIndustry(e.target.value)}
                value={industry}
                required={true}
                title="Industry"
                Icon={FaBuilding}
              />

               <Button
                title="Request a Demo"
                type="submit"
                color="yellow"
                loading={loading}
                isFullWidth={true}
                label={true}
              />
                
                </div>
           
             
              <div className={`${styles.padding} ${styles.center}`}>
                <Link to="/login">Already have an account? Sign in</Link>
              </div>
            </form>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Demo;
