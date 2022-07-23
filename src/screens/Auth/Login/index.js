import React, { useState, useEffect } from "react";
import { Input, Button, TopNav } from "../../../components";
import styles from "../styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "../../../redux/actions/userActions";
import { USER_AUTH_RESET } from "../../../redux/constants/userConstants";
import { FaEnvelope, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  // Helpers
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form Fields OnChange
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login Handler
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(userAuth(email, password));
  };
  // Login state
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: USER_AUTH_RESET });
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
        <div className={styles.formContainer}>
          {/* <div className="padding">
            <h3>
              K<span className="danger">NO</span>W MISSED VISITS and
              cross-institutional support WORKERS DOUBLE-BOOKING?
            </h3>
          </div> */}
          <form onSubmit={loginHandler}>
            <Input
              Icon={FaEnvelope}
              type="text"
              value={email}
              title="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              Icon={FaEyeSlash}
              type="password"
              value={password}
              title="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={`padding ${styles.right}`}>
              <Link to="/forgotPassword">Forgot Password?</Link>
            </div>

            <Button
              type="submit"
              title="Login"
              isFullWidth={true}
              loading={loading}
              color="yellow"
            />
            <div className={`${styles.padding} ${styles.center}`}>
              <Link to="/request-a-demo">
               New User? Request a demo Create one
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
