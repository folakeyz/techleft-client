import React, { useState, useEffect, Suspense } from "react";
import {
  Header,
  Navigation,
  Input,
  Button,
  Textarea,
  Select,
  Options,
  Text,
  Modal,
  MenuBar,
} from "../../components";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { useToast, CircularProgress } from "@chakra-ui/react";
import {
  createCompany,
  getMyCompany,
  updateMyCompany,
} from "../../redux/actions/companyActions";
import {
  CREATE_COMPANY_RESET,
  UPDATE_COMPANY_RESET,
} from "../../redux/constants/companyConstants";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlusCircle, FaWrench } from "react-icons/fa";

const Company = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const addCompany = useSelector((state) => state.addCompany);
  const { loading, error, success } = addCompany;

  const updateCompany = useSelector((state) => state.updateCompany);
  const { loading: uLoading, error: uError, success: uSuccess } = updateCompany;

  const getCompany = useSelector((state) => state.getCompany);
  const { myCompany = [] } = getCompany;
  const [id, setID] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState(null);

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: CREATE_COMPANY_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Company Updated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch(getMyCompany());
    dispatch({ type: CREATE_COMPANY_RESET });
  }

  if (uError) {
    toast({
      title: "Error",
      description: uError,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: UPDATE_COMPANY_RESET });
  }
  if (uSuccess) {
    toast({
      title: "Notification",
      description: "Company Updated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    setOpen(false);
    dispatch(getMyCompany());
    dispatch({ type: UPDATE_COMPANY_RESET });
  }

  useEffect(() => {
    dispatch(getMyCompany());
  }, [dispatch]);

  const companyHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    logo && formData.append("logo", logo);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("province", province);
    formData.append("country", country);
    formData.append("postal_code", postal_code);
    formData.append("contact_person", contact_person);
    formData.append("website", website);
    formData.append("phone", phone);

    dispatch(createCompany(formData));
  };

  const uploadFileHandler = (e) => {
    e.preventDefault();
    setLogo(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // logo && formData.append("logo", logo);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("province", province);
    formData.append("country", country);
    formData.append("postal_code", postal_code);
    // formData.append("contact_person", contact_person);
    formData.append("website", website);
    formData.append("phone", phone);

    dispatch(updateMyCompany(formData, id));
  };

  // Menubar Items
  const menu = [
    { name: "Profile", url: "/app/profile" },
    { name: "Company", active: true, url: "/app/company" },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const userProfile = useSelector((state) => state.userProfile);
  const { user = {} } = userProfile;

  const editHandler = (e) => {
    onOpen();
    setOpen(true);
    setName(myCompany[0].name);
    setEmail(myCompany[0].email);
    setDescription(myCompany[0].description);
    setPhone(myCompany[0].phone);
    setAddress(myCompany[0].address);
    setProvince(myCompany[0].province);
    setCountry(myCompany[0].country);
    setPostalCode(myCompany[0].postal_code);
    setContactPerson(myCompany[0].contact_person);
    setWebsite(myCompany[0].website);
    setID(myCompany[0].id);
  };

  return (
    <div className="appContainer">
      <Navigation />
      <Suspense fallback={<CircularProgress isIndeterminate color="blue" />}>
        <div className="contentsRight">
          <Header pageTitle="Company" />
          {user.is_staff === true && <MenuBar menu={menu} />}
          <div className="btnContainer right">
            <button
              className="btnSM color2"
              onClick={myCompany[0] ? editHandler : onOpen}
              type="button"
              ref={btnRef}
            >
              {myCompany[0] ? (
                <FaWrench style={{ marginRight: "1rem" }} />
              ) : (
                <FaPlusCircle style={{ marginRight: "1rem" }} />
              )}

              {myCompany[0] ? `Edit Company` : "  Add Company"}
            </button>
          </div>
          <div className={styles.company}>
            {myCompany[0] && (
              <>
                <Text title="Company Name" value={myCompany[0].name} />
                <Text title="Email" value={myCompany[0].email} />
                <Text title="Country" value={myCompany[0].country} />
                <Text title="Province" value={myCompany[0].province} />
                <Text title="Website" value={myCompany[0].website} />
                <Text title="Address" value={myCompany[0].address} size="lg" />
                <Text
                  title="Description"
                  value={myCompany[0].description}
                  size="lg"
                />
              </>
            )}
          </div>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="lg"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                {" "}
                {myCompany[0] ? "Edit Company" : "Add Company"}
              </DrawerHeader>

              <DrawerBody>
                <form onSubmit={myCompany[0] ? submitHandler : companyHandler}>
                  <div className="techleft__InputFlex">
                    <Input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required={true}
                      title="Company Name"
                      form={true}
                    />
                    <Input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required={true}
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
                      onChange={(e) => setContactPerson(e.target.value)}
                      value={contact_person}
                      // required={true}
                      title="Contact Person"
                      form={true}
                    />
                    <Input
                      type="text"
                      onChange={(e) => setPostalCode(e.target.value)}
                      value={postal_code}
                      // required={true}
                      title="Postal Code"
                      form={true}
                    />
                    <Input
                      type="text"
                      onChange={(e) => setWebsite(e.target.value)}
                      value={website}
                      // required={true}
                      title="Website"
                      form={true}
                    />
                    {/* <Input
                      type="file"
                      onChange={uploadFileHandler}
                      // required={true}
                      title="Company Logo"
                      form={true}
                    /> */}

                    <Textarea
                      title="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required={true}
                      size="lg"
                      form={true}
                    />
                    <Textarea
                      title="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      // required={true}
                      size="lg"
                      form={true}
                    />

                    <Button
                      title={"Update Company"}
                      type="Submit"
                      color="blue"
                      loading={uLoading}
                      form={true}
                      isFullWidth={true}
                      size="lg"
                    />
                  </div>
                </form>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      </Suspense>
    </div>
  );
};

export default Company;
