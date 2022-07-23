import React, { useState } from "react";
import { Input, Button, TopNav } from "../../../components";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { authForgot } from "../../../redux/actions/userActions";
import { FORGOT_PASSWORD_RESET } from "../../../redux/constants/userConstants";
import { FaEnvelope } from "react-icons/fa";
const ForgotPassword = () => {
  // Helpers
  const toast = useToast();
  const dispatch = useDispatch();

  // Form Fields OnChange
  const [email, setEmail] = useState("");

  // Login Handler
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(authForgot(email));
  };
  // Login state
  const userForgot = useSelector((state) => state.userForgot);
  const { loading, success, error } = userForgot;

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: FORGOT_PASSWORD_RESET });
  }

  if (success) {
    toast({
      title: "Password Reset Successful",
      description: "Check your email for token",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: FORGOT_PASSWORD_RESET });
  }

  return (
    <div className={styles.app}>
      <TopNav />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          {/* <div className="padding">
            <h3>
              K<span className="danger">NO</span>W MISSED VISITS and
              cross-institutional support WORKERS DOUBLE-BOOKING?
            </h3>
          </div> */}

          <form onSubmit={loginHandler}>
            <Input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required={true}
              title="Email Address"
              Icon={FaEnvelope}
            />
            <div className="padding">
              <div className={styles.right}>
                <span>
                  <Link to="/login">Login</Link>
                </span>
              </div>
            </div>

            <Button
              title="Forgot Password"
              type="submit"
              loading={loading}
              isFullWidth={true}
              color="yellow"
            />
           <div className={`${styles.padding} ${styles.center}`}>
              <p>
                <Link to="/request-a-demo">
                New User? Request a demo Create one
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
