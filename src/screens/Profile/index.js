import React, { useState, useEffect, Suspense } from "react";
import {
  Header,
  Navigation,
  Input,
  Button,
  MenuBar,
  Text,
} from "../../components";
import { getMe, updateMyProfile } from "../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { UPDATE_ME_RESET } from "../../redux/constants/userConstants";
import { useToast, CircularProgress } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaWrench } from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const userProfile = useSelector((state) => state.userProfile);
  const { user = {} } = userProfile;

  const updateUser = useSelector((state) => state.updateUser);
  const { loading, error, success } = updateUser;

  const [first_name, setFirstName] = useState("");
  // const [middle_name, setMiddleName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [id, setID] = useState("");

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: UPDATE_ME_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Profile Updated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch(getMe());
    dispatch({ type: UPDATE_ME_RESET });
  }

  useEffect(() => {
    setEmail(user.email);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setUsername(user.username);
    setID(user.id);
  }, [user]);

  const updateProfile = () => {
    dispatch(updateMyProfile(first_name, last_name, username, email, id));
  };

  // Menubar Items
  const menu = [
    { name: "Profile", active: true, url: "/app/profile" },
    { name: "Company", url: "/app/company" },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <div className="appContainer">
      <Navigation />
      <Suspense fallback={<CircularProgress />}>
        <div className="contentsRight">
          <Header pageTitle="Profile" />
          {user.is_staff === true && (
            <>
              <MenuBar menu={menu} />
              <div className="btnContainer right">
                <button
                  className="btnSM color2"
                  onClick={onOpen}
                  type="button"
                  ref={btnRef}
                >
                  <FaWrench style={{ marginRight: "1rem" }} />
                  {/* <FaPlusCircle style={{ marginRight: "1rem" }} /> */}
                  Edit Profile
                </button>
              </div>
            </>
          )}

          <div className={styles.profile}>
            <Text title="Username" value={username} />
            <Text title="Firstname" value={first_name} />
            <Text title="Lastname" value={last_name} />
            <Text title="Email" value={email} />
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
              size="md"
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Update Profile</DrawerHeader>

                <DrawerBody>
                  <div className={styles.forms}>
                    <Input
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      required={true}
                      title="Username"
                      form={true}
                      readOnly={user.is_staff === false}
                      size="lg"
                    />
                    <Input
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={first_name}
                      required={true}
                      title="First Name"
                      form={true}
                      readOnly={user.is_staff === false}
                      size="lg"
                    />
                    {/* <Input
                type="text"
                onChange={(e) => setMiddleName(e.target.value)}
                value={middle_name}
                required={true}
                title="Middle Name"
                form={true}
                readOnly={user.is_staff === false}
              /> */}
                    <Input
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                      value={last_name}
                      required={true}
                      title="Last Name"
                      form={true}
                      readOnly={user.is_staff === false}
                      size="lg"
                    />
                    <Input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required={true}
                      title="Email"
                      form={true}
                      size="lg"
                    />
                    <Button
                      title="Update Profile"
                      color="yellow"
                      type="button"
                      onClick={updateProfile}
                      isFullWidth={true}
                      loading={loading}
                      size="lg"
                      Icon={FaWrench}
                    />
                  </div>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Profile;
