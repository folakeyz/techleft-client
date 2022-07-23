import React, { useState, useEffect } from "react";
import { Input, Button, TopNav } from "../../../components";
import styles from "../styles.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { authReset } from "../../../redux/actions/userActions";
import { RESET_PASSWORD_RESET } from "../../../redux/constants/userConstants";
import { FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  // Helpers
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  // Form Fields OnChange
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Login Handler
  const loginHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(authReset(password, token));
    } else {
      toast({
        title: "Error",
        description: "Password does not match",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  // Login state
  const userReset = useSelector((state) => state.userReset);
  const { loading, success, error } = userReset;

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: RESET_PASSWORD_RESET });
  }

  // redirect on userlogin success
  useEffect(() => {
    if (success) {
      navigate("/resetPassword");
    }
  }, [navigate, success]);

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
              type="New password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required={true}
              title="Password"
              Icon={FaEyeSlash}
            />
            <Input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required={true}
              title="Confirm Password"
              Icon={FaEyeSlash}
            />

            <div className={`padding ${styles.right}`}>
              <span>
                <Link to="/">Login</Link>
              </span>
            </div>
            <Button
              title="Reset Password"
              type="submit"
              color="yellow"
              loading={loading}
              isFullWidth={true}
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

export default ResetPassword;
