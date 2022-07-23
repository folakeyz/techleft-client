import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Assistant,
  Branch,
  Client,
  Company,
  Dashboard,
  Department,
  Employees,
  Login,
  ManageClient,
  Profile,
  Schedule,
  ClientAssistant,
  Reports,
  ForgotPassword,
  ResetPassword,
  AddClient,
  AddEmployees,
  AllSchedule,
  AllAssistant,
  Rota,
  BatchEmployee,
  MyClients,
  Home,
  Demo,
  Invite
} from "./screens";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/request-a-demo" exact element={<Demo />} />
          <Route path="/email/invite/:company" exact element={<Invite />} />
          <Route path="/forgotPassword" exact element={<ForgotPassword />} />
          <Route
            path="/resetPassword/:token"
            exact
            element={<ResetPassword />}
          />
          <Route path="/app/dashboard" exact element={<Dashboard />} />
          <Route path="/app/profile" exact element={<Profile />} />
          <Route path="/app/company" exact element={<Company />} />
          <Route path="/app/branch" exact element={<Branch />} />
          <Route path="/app/department" exact element={<Department />} />
          <Route path="/app/client" exact element={<Client />} />
          <Route path="/app/client/add" exact element={<AddClient />} />
          <Route
            path="/app/client/:clientID"
            exact
            element={<ManageClient />}
          />
          <Route path="/app/employees" exact element={<Employees />} />
          <Route path="/app/employee/add" exact element={<AddEmployees />} />
          <Route path="/app/employee/batch" exact element={<BatchEmployee />} />
          <Route path="/app/schedule" exact element={<Schedule />} />
          <Route path="/app/schedule/all" exact element={<AllSchedule />} />
          <Route
            path="/app/assistant/all/:id/:index"
            exact
            element={<AllAssistant />}
          />

          <Route
            path="/app/assistant/:id/:scheduleId"
            exact
            element={<Assistant />}
          />
          <Route
            path="/app/myschedule/:client"
            exact
            element={<ClientAssistant />}
          />
          <Route path="/app/myclients" exact element={<MyClients />} />
          <Route path="/app/rota" exact element={<Rota />} />
          <Route path="/app/reports" exact element={<Reports />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
