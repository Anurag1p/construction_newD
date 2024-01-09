import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assests/css/sidebar.css";
import "./assests/css/style.css";
import "./assests/css/graph.css";
import AdminDashboard from "./Admin/AdminDashboard";
import EmployeeAttendance from "./employee/EmployeeAttendance";
import EmployeeLogin from "./auth/EmployeeLogin";
import EmployeeHistory from "./employee/EmployeeHistory";
// import CompanyDashboard from "./company/dashboard/Dashboard";
import ProjectHome from "./company/myproject/ProjectAllocate";
import EmployeeSrc from "./employee/EmployeeSrc";
import AttendanceReport from "./company/attendance/AttendanceAcknowledge";
import Document from "./Document/Documents";
import Signup from "./auth/Signup";
import { auth } from "./firebase";
import SubContract from "./subcontract/SubContract";
import AdminLogin from "./auth/AdminLogin";
import Firecreate from "./components/Firecreate";
import UserLogin from "./auth/UserLogin";
import Updates from "./auth/Update";
import EmployeeTimeSheet from "./company/myemployee/EmployeeTimeSheet";
import EmployeeTimeSheetUser from "./employee/EmployeeTimeSheetUser";
import Sidebar from "./components/Sidebar";
import Project from "./company/myproject/Project";
import axios from "axios";
import ProjectDetail from "./company/myproject/ProjectDetail";
import ProjectAllocate from "./company/myproject/ProjectAllocate";
import ProjectLoc from "./company/myproject/ProjectLoc";
import ProjectDocuments from "./company/myproject/ProjectDocuments";
import Employee from "./company/myemployee/Employee";
import EmployeeDetail from "./employee/EmployeeDetail";
import EmployeeDetai from "./company/myemployee/EmployeeDetail";
import EmployeeManual from "./company/myemployee/EmployeeManual";
import EmployeeDocuments from "./company/myemployee/EmployeeDocuments";
import AttendanceAcknowledge from "./company/attendance/AttendanceAcknowledge";
import Documents from "./company/document/Documents";
import Contractor from "./company/mycontractor/Contractor";
import ContractorDetail from "./company/mycontractor/ContractorDetail";
import Dashboard from "./contractors/dashboard/Dashboard";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { setCompanyuser } from "./redux/slices/CompanyLoginSlice"
import { setOneCompany } from "./redux/slices/getOneCompanySlice"
import { setAllProject } from "./redux/slices/getallProjectSlice"
import SubContractorDoc from "./company/mycontractor/SubContractorDoc";

function App() {
  const [userName, setUserName] = useState("");
  const Dispatch = useDispatch()
  const companyData = useSelector(prev => prev.companyLogin.user)
  const companyAllData = useSelector(prev => prev.setOneCompany.user)
  const projectAllData = useSelector(prev => prev.allProject.user)
  console.log(companyData, "companyLoginData")

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const data = user?.displayName;
        const splitedData = data?.split("&&");
        console.log(user, "user");
        setUserName(splitedData);
        Dispatch(setCompanyuser(splitedData))
        console.log(splitedData, "splitedData");
      } else setUserName("");
    });
  }, []);


  // extract company
  const COMPANY_ID = companyData?.[0];
  const COMPANY_USERNAME = companyData?.[1];
  const COMPANY_PARENT_ID = companyData?.[2];
  const COMPANY_PARENT_USERNAME = companyData?.[3];
  console.log(COMPANY_ID, "uni");

  const headers = {
    "Content-Type": "application/json"
  };

  // get company
  const getCompany = async () => {
    try {
      const response = await axios.put(
        "/api/get_company",
        {
          COMPANY_PARENT_ID: COMPANY_PARENT_ID,
          COMPANY_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
          COMPANY_ID: COMPANY_ID,
          COMPANY_USERNAME: COMPANY_USERNAME
        },
        {
          headers
        }
      );
      //remove
      const data = response.data;
      Dispatch(setOneCompany(data.result));

      // }, 1000);
    } catch (error) {
      console.log("Error fetching data:", error);

    }
  };

  const fetchProjects = async (e) => {
    try {
      const response = await axios.put("/api/get_projects", {
        PROJECT_PARENT_ID: COMPANY_ID,
        PROJECT_PARENT_USERNAME: COMPANY_USERNAME,
        PROJECT_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
        PROJECT_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
      });
      const data = response.data;
      // setResStatus(true);
      // setProjectData(data?.result);
      // 
      Dispatch(setAllProject(data?.result))
    } catch (err) {
      console.log("Something Went Wrong: =>", err);
      // setResStatus("error");
    }
  };


  useEffect(() => {
    getCompany();
  }, [companyData]);

  useEffect(() => {
    fetchProjects();
  }, [companyAllData]);



  return (
    <div
      className="wrapper"
      style={{ overflowX: "scroll", overflow: "hidden" }}
    >
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/root" element={<AdminLogin />} />
            <Route path="/" element={<UserLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/employee/history" element={<EmployeeHistory />} />
            <Route path="/myadmin" element={<AdminDashboard />} />
            <Route path="/test" element={<Updates />} />
            {/* <Route
              path="/company/dashboard"
              element={<CompanyDashboard data={userName} />}
            /> */}
            <Route
              path="/employee/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME"
              element={<EmployeeDetail state={userName} />}
            />
            <Route
              path="/employee/attendance"
              element={<EmployeeAttendance state={userName} />}
            />
            <Route
              path="/employee/timesheet"
              element={<EmployeeTimeSheetUser />}
            />
            <Route
              path="/employee/attendance/:latt/:lngi/:areas/:loca/:employees/:projects/:projectids"
              element={<EmployeeAttendance state={userName} />}
            />

            {/* compnay dashboard */}
            <Route
              path="/company/dashboard/"
              element={
                <Dashboard />
              }
            />
            {/* company dashboard */}

            {/* project */}
            <Route
              path="/company/projects/"
              element={
                <Project />
              }
            />
            <Route
              path="/company/projects/detail"
              element={<ProjectDetail />}
            />
            <Route
              path="/company/projects/allocate-employee"
              element={<ProjectAllocate />}
            />
            <Route path="/company/projects/tracking" element={<ProjectLoc />} />
            <Route
              path="/company/projects/documents"
              element={<ProjectDocuments />}
            />
            {/* project */}

            {/* My employees */}
            <Route
              path="/company/employees"
              element={
                <Employee
                  COMPANY_ID={COMPANY_ID}
                  COMPANY_USERNAME={COMPANY_USERNAME}
                  COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                  COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                />
              }
            />

            <Route
              path="/company/employees/detail"
              element={<EmployeeDetai />}
            />
            <Route
              path="/company/employees/timesheet"
              element={<EmployeeTimeSheet />}
            />
            <Route
              path="/company/employees/manual-attendence"
              element={<EmployeeManual />}
            />
            <Route
              path="/company/employees/documents"
              element={<EmployeeDocuments />}
            />
            {/* My employees */}

            {/* attendance */}
            <Route
              path="/company/attendance"
              element={
                <AttendanceAcknowledge
                  COMPANY_ID={COMPANY_ID}
                  COMPANY_USERNAME={COMPANY_USERNAME}
                  COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                  COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                />
              }
            />
            {/* attendance */}

            {/* document company */}
            <Route
              path="/company/documents"
              element={
                <Documents
                  COMPANY_ID={COMPANY_ID}
                  COMPANY_USERNAME={COMPANY_USERNAME}
                  COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                  COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                />
              }
            />
            {/* document company */}


            {/* My contractors */}
            <Route
              path="/company/subcontractors"
              element={
                <Contractor
                  COMPANY_ID={COMPANY_ID}
                  COMPANY_USERNAME={COMPANY_USERNAME}
                  COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                  COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                />
              }
            />
            <Route
              path="/company/subcontractors/detail"
              element={<ContractorDetail />}
            />
            <Route
              path="/company/subcontractors/documents"
              element={<SubContractorDoc />}
            />

            {/* My contractos */}


            {/* <Route
              path="/company/employees/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME"
              element={<EmployeeSrc />}
            />
            <Route
              path="/company/attendance/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME"
              element={<AttendanceReport />}
            />
            <Route
              path="/company/documents/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME"
              element={<Document />}
            /> */}
            {/* <Route
              path="/company/contractor/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME"
              element={<SubContract />}
            /> */}
            <Route path="/temp/" element={<Firecreate />} />
          </>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
