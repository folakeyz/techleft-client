import React, { useEffect, useState, Suspense } from "react";
import { Header, Navigation, Card, Greeting } from "../../components";
import styles from "./styles.module.css";
import {
  AiOutlineTeam,
  AiOutlineBranches,
  AiTwotoneGold,
  AiFillFileText,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranch } from "../../redux/actions/branchActions";
import { fetchDepartment } from "../../redux/actions/departmentActions";
import { fetchClient } from "../../redux/actions/clientActions";
import { fetchEmployee } from "../../redux/actions/employeeActions";
import { getallUsers } from "../../redux/actions/userActions";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CircularProgress } from "@chakra-ui/react";
const Dashboard = () => {
  //Helpers
  const dispatch = useDispatch();
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    dispatch(fetchBranch());
    dispatch(fetchDepartment());
    dispatch(fetchClient());
    dispatch(fetchEmployee());
    dispatch(getallUsers());
  }, [dispatch]);

  const getBranch = useSelector((state) => state.getBranch);
  const { branches = [] } = getBranch;
  const getClient = useSelector((state) => state.getClient);
  const { clients = [] } = getClient;
  const getDepartment = useSelector((state) => state.getDepartment);
  const { departments = [] } = getDepartment;
  const getEmployee = useSelector((state) => state.getEmployee);
  const { employees = [] } = getEmployee;

  const userProfile = useSelector((state) => state.userProfile);
  const { user = {} } = userProfile;

  const getEvent = useSelector((state) => state.getEvent);
  const { events } = getEvent;

  const eventData =
    events &&
    events.filter((x) => x.employee && x.employee.user.id === user.id);
  const accepted = eventData && eventData.filter((x) => x.status === "Started");
  const rejected = eventData && eventData.filter((x) => x.status === "Dropped");

  const me = employees.find((x) => x.employee_id === user.employee_id);
  console.log(me);
  return (
    <div className="appContainer">
      <Navigation />
      <Suspense fallback={<CircularProgress isIndeterminate color="blue" />}>
        <div className="contentsRight">
          <Header pageTitle="Dashboard" />
          <Greeting name={user.first_name ? user.first_name : user.email} />
          <div className={styles.dashboardFlex}>
            {user.is_staff === true && (
              <div className={styles.cardFlex}>
                <Card
                  count={employees ? employees.length : 0}
                  title="Employees"
                  Icon={AiOutlineTeam}
                  color="crimson"
                  primary="red"
                  url="/app/employees"
                />
                <Card
                  count={branches ? branches.length : 0}
                  title="Branches"
                  Icon={AiOutlineBranches}
                  color="cyan"
                  primary="blue"
                  url="/app/branch"
                />
                <Card
                  count={departments ? departments.length : 0}
                  title="Departments"
                  Icon={AiTwotoneGold}
                  color="gold"
                  primary="lightGold"
                  url="/app/department"
                />
                <Card
                  count={clients ? clients.length : 0}
                  title="Clients"
                  Icon={AiOutlineTeam}
                  color="blue"
                  primary="cyan"
                  url="/app/client"
                />
                <Card
                  count={events ? events.length : 0}
                  title="Total Schedules"
                  Icon={AiFillFileText}
                  color="purple"
                  primary="dpurple"
                  url="/app/reports"
                />
              </div>
            )}

            {user.is_staff === false && (
              <div className={styles.cardFlex}>
                <Card
                  count={eventData ? eventData.length : 0}
                  title="Schedules"
                  Icon={AiOutlineTeam}
                  color="crimson"
                  primary="red"
                  url="/app/myschedule"
                />
                <Card
                  count={accepted ? accepted.length : 0}
                  title="Accepted Schedule"
                  Icon={AiOutlineBranches}
                  color="cyan"
                  primary="blue"
                  url="/app/myschedule"
                />
                <Card
                  count={rejected ? rejected.length : 0}
                  title="Rejected Schedule"
                  Icon={AiTwotoneGold}
                  color="gold"
                  primary="lightGold"
                  url="/app/department"
                />
              </div>
            )}
            <div className={styles.calendar}>
              <Calendar onChange={onChange} value={value} />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Dashboard;
