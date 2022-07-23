import React, { useState, useEffect } from "react";
import {
  Header,
  Navigation,
  Input,
  Button,
  Textarea,
  Select,
  Options,
  DateInput,
} from "../../components";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { useToast, CircularProgress, Center } from "@chakra-ui/react";
import { createClient } from "../../redux/actions/clientActions";
import { CREATE_CLIENT_RESET } from "../../redux/constants/clientConstants";
import { getMyCompany } from "../../redux/actions/companyActions";
import { Link, useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

const AddClient = () => {
  // Helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const addClient = useSelector((state) => state.addClient);
  const { loading, error, success } = addClient;

  const getCompany = useSelector((state) => state.getCompany);
  const { myCompany = [] } = getCompany;
  const company = myCompany[0] ? myCompany[0].id : "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState([]);
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [join_date, setJoinDate] = useState("");

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: CREATE_CLIENT_RESET });
  }

  if (success) {
    toast({
      title: "Notification",
      description: "Client added Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    navigate("/app/client");
    dispatch({ type: CREATE_CLIENT_RESET });
  }

  useEffect(() => {
    dispatch(getMyCompany());
  }, [dispatch]);

  const branchHandler = (e) => {
    e.preventDefault();
    dispatch(
      createClient(
        company,
        name,
        email,
        phone,
        address,
        province,
        country,
        postal_code,
        join_date
      )
    );
  };

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header pageTitle="Client" />
        <div className={styles.company}>
          <div className={styles.branch}>
            <div className="btnContainer">
              <Link to="/app/client" className="btnSM color1">
                Go Back
              </Link>
            </div>
            <div className="formPadding">
              {loading ? (
                <Center>
                  <CircularProgress isIndeterminate color="#087E8C" />
                </Center>
              ) : (
                <form onSubmit={branchHandler}>
                  <div className="test__InputFlex">
                    <Input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required={true}
                      title="Client Name"
                      form={true}
                    />
                    <Input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      title="Email"
                      form={true}
                    />
                    <Input
                      type="number"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      required={true}
                      title="Phone Number"
                      form={true}
                    />

                    <Select
                      onChange={(e) => setCountry(e.target.value)}
                      value={country}
                      title="Country"
                      options={Options.countries}
                      required={true}
                      form={true}
                    />
                    <Input
                      type="text"
                      onChange={(e) => setProvince(e.target.value)}
                      value={province}
                      required={true}
                      title="Province"
                      form={true}
                    />

                    <Input
                      type="text"
                      onChange={(e) => setPostalCode(e.target.value)}
                      value={postal_code}
                      required={true}
                      title="Postal Code"
                      form={true}
                    />
                    <DateInput
                      type="text"
                      onChange={(e) => setJoinDate(e.target.value)}
                      value={join_date}
                      required={true}
                      title="Join Date"
                      form={true}
                    />
                    <Textarea
                      title="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required={true}
                      form={true}
                    />

                    <Button
                      title={"Add Client"}
                      type="submit"
                      isFullWidth={true}
                      loading={loading}
                      Icon={FaPlusCircle}
                      color="color2"
                    />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
