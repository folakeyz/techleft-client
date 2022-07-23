import React, { useEffect, Suspense } from "react";
import { Header, Navigation, Card } from "../../components";
import styles from "./styles.module.css";
import { AiOutlineTeam } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployee } from "../../redux/actions/employeeActions";
import { getallUsers } from "../../redux/actions/userActions";
import "react-calendar/dist/Calendar.css";
import { CircularProgress } from "@chakra-ui/react";
const MyClients = () => {
  //Helpers
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(getallUsers());
  }, [dispatch]);

  const getEmployee = useSelector((state) => state.getEmployee);
  const { employees = [] } = getEmployee;

  const userProfile = useSelector((state) => state.userProfile);
  const { user = {} } = userProfile;

  const me = employees.find((x) => x.employee_id === user.employee_id);
  const myClients = me ? me.clients : [];

  const getEvent = useSelector((state) => state.getEvent);
  const { events } = getEvent;

  const getEventCount = (id) => {
    const evt = events ? events.filter((x) => x.client.id === id) : [];
    console.log(evt);
    return evt.length;
  };

  return (
    <div className="appContainer">
      <Navigation />
      <Suspense fallback={<CircularProgress isIndeterminate color="blue" />}>
        <div className="contentsRight">
          <Header pageTitle="My Clients" />
          <div className={styles.dashboardFlex}>
            <div className={styles.cardFlex}>
              {myClients.map((item, i) => (
                <Card
                  count={getEventCount(item.id)}
                  title={item.name}
                  Icon={AiOutlineTeam}
                  color="crimson"
                  primary="red"
                  url={`/app/myschedule/${item.id}`}
                  key={i}
                />
              ))}
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default MyClients;
