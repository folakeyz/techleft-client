import React, { useEffect } from "react";
import { Header, Navigation, MenuBar } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { CircularProgress, Center } from "@chakra-ui/react";

import MaterialTable from "material-table";
import { getMyCompany } from "../../redux/actions/companyActions";
import { fetchClient } from "../../redux/actions/clientActions";
import { fetchRota } from "../../redux/actions/rotaActions";
import { useNavigate, Link } from "react-router-dom";

import { FaPlusCircle, FaSearchengin } from "react-icons/fa";

const AllSchedule = () => {
  const navigate = useNavigate();
  //Table data
  const columns = [
    { title: "Month", field: "month" },
    { title: "Year", field: "year" },
  ];

  // Helpers
  const dispatch = useDispatch();
  const getRota = useSelector((state) => state.getRota);
  const { loading, rotas } = getRota;

  useEffect(() => {
    dispatch(fetchClient());
    dispatch(fetchRota());
    dispatch(getMyCompany());
  }, [dispatch]);

  // Menubar Items
  const menu = [
    { name: "Month Setup", url: "/app/rota" },
    { name: "Manage Schedule", active: true, url: "/app/schedule" },
    { name: "Time Sheet", url: "/app/reports" },
  ];

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header pageTitle="Schedule" />
        <div className={styles.company}>
          <MenuBar menu={menu} />
          {loading ? (
            <Center>
              <CircularProgress isIndeterminate />
            </Center>
          ) : (
            <div className={styles.branch}>
              <div className="btnContainer right">
                <Link to="/app/schedule" className="btnSM color2">
                  <FaPlusCircle />
                  &nbsp;&nbsp;Add Schedule
                </Link>

                <Link to="/app/schedule/all" className="btnSM color1">
                  <FaSearchengin />
                  &nbsp;&nbsp;View All Schedules
                </Link>
              </div>

              <MaterialTable
                title=""
                columns={columns}
                data={rotas}
                options={{
                  exportAllData: true,
                  exportButton: true,
                  actionsCellStyle: {
                    backgroundColor: "none",
                    color: "#FF00dd",
                  },
                  actionsColumnIndex: -1,

                  headerStyle: {
                    backgroundColor: "#dcdcdc",
                    color: "black",
                    fontWeight: "bold",
                  },
                }}
                style={{
                  boxShadow: "none",
                  width: "100%",
                  background: "none",
                  fontSize: "13px",
                }}
                actions={[
                  {
                    icon: "launch",
                    iconProps: { style: { fontSize: "20px", color: "gold" } },
                    tooltip: "Manage",
                    onClick: (event, rowData) => {
                      navigate(
                        `/app/assistant/all/${rowData.id}/${rowData.index}`
                      );
                    },
                    title: "View",
                    color: "color2",
                    Icon: FaSearchengin,
                  },
                ]}
                components={{
                  Action: (props) => (
                    <button
                      onClick={(event) =>
                        props.action.onClick(event, props.data)
                      }
                      className={`btnTable ${props.action.color}`}
                    >
                      <props.action.Icon /> {props.action.title}
                    </button>
                  ),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllSchedule;
