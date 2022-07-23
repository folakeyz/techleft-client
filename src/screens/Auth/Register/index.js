import React, { useState, useEffect } from "react";
import { Input, Button, TopNav } from "../../../components";
import styles from "../styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { RegisterUser } from "../../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_ACCOUNT_RESET } from "../../../redux/constants/userConstants";
import { FaEnvelope, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  // Helpers
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form Fields OnChange
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const is_staff = true;
  // Login Handler
  const loginHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Warning",
        description: "Password does not match",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      dispatch(RegisterUser(email, password, is_staff));
    }
  };

  // Login state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, success, error } = userRegister;

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: CREATE_ACCOUNT_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Account Created Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: CREATE_ACCOUNT_RESET });
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
        <div className={styles.formContainer}>
          <div className="padding">
            <h3>
              K<span className="danger">NO</span>W MISSED VISITS and
              cross-institutional support WORKERS DOUBLE-BOOKING?
            </h3>
          </div>
          <div className="techleft__InputContainer">
            <form onSubmit={loginHandler}>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required={true}
                title="Email Address"
                Icon={FaEnvelope}
              />
              <Input
                type="password"
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
              <Button
                title="Create Account"
                type="submit"
                color="color2"
                loading={loading}
                isFullWidth={true}
              />
              <div className={`${styles.padding} ${styles.center}`}>
                <Link to="/">Already have an account? Sign in</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
