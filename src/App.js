import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assests/css/sidebar.css";
import "./assests/css/style.css";
import "./assests/css/graph.css";
import { MyContext } from "./context/Mycontext";
import AdminCreate from "./Admin/AdminCreate";
import AdminDashboard from "./Admin/AdminDashboard";
import CompanyMain from "./company/CompanyMain";
import AdminLogin from "./Admin/AdminLogin";
import EmployeeAttendance from "./employee/EmployeeAttendance";
import EmployeeLogin from "./employee/EmployeeLogin";
import Temp from "./Attendance/Temp";
import Cookies from "js-cookie";
import EmployeeHistory from "./employee/EmployeeHistory";
import EmployeeDetail from "./employee/EmployeeDetail";

function App() {

  const [data, setData] = useState("")
  const [user, userData] = useState("")
  const [dataEmp, setDataEmp] = useState("")
  const [userEmp, userDataEmp] = useState("")

  // get cookie

  useEffect(() => {
    let cookdata;
    const cookieData = Cookies.get("myResponseData");
    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      cookdata = parsedData
      userData(parsedData)
    } else {
      console.log("Cookie data not found.");
    }

    let isAuthenticated = cookdata?.operation === "successfull";
    setData(isAuthenticated)

  }, [])


  useEffect(() => {
    let cookdataEmp;

    const cookieData = Cookies.get("myResponseEmployee");

    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      cookdataEmp = parsedData
      userDataEmp(parsedData)
    } else {
      console.log("Cookie data not found.");
    }

    console.log(cookdataEmp?.operation, "stored data emp")
    let isAuthenticated = cookdataEmp?.operation === "successfull";
    setDataEmp(isAuthenticated)

  }, [])

  return (
    <div className="wrapper" style={{ overflowX: "scroll", overflow: "hidden" }}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <>

            <Route path="/signup/*" element={<AdminCreate />} />
            <Route path="/login/*" element={<AdminLogin />} />
            <Route path="/*" element={<AdminLogin />} />
            <Route path="/employee/login/*" element={<EmployeeLogin />} />
          </>

          {data ?
            <>
              <Route
                path="/"
                element={<Navigate to="/admin" />} // Redirect to admin dashboard
              />

              <Route path="/admin/*" element={<AdminDashboard state={user} />} />
              <Route path="/company/*" element={<CompanyMain />} />
              <Route path="/temp/*" element={<Temp />} />

            </> :
            <Route path="/*" element={<Navigate to="/login" />} />
          }

          {dataEmp ?
            <>

            <Route path="/employee/*" element={<EmployeeDetail state={userEmp.result} />} />
            <Route path="/employee/attendance/:id/*" element={<EmployeeAttendance state={userEmp} />} />
            <Route path="/employee/history/:*" element={<EmployeeHistory state={userEmp} />} />

            </> :
            // <Route path="/employee/*" element={<Navigate to="/employee/login" />} />
            ""
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
