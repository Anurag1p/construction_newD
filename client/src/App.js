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

// import CompanyDashboard from "./company/dashboard/Dashboard";
// import ProjectHome from "./company/myproject/ProjectAllocate";
// import EmployeeSrc from "./employee/EmployeeSrc";
// import AttendanceReport from "./company/attendance/AttendanceAcknowledge";
import Signup from "./auth/Signup";
import { auth } from "./firebase";
import AdminLogin from "./auth/AdminLogin";
import Firecreate from "./components/Firecreate";
import UserLogin from "./auth/UserLogin";
import Updates from "./auth/Update";
import EmployeeTimeSheet from "./company/myemployee/EmployeeTimeSheet";
import Sidebar from "./components/Sidebar";
import Project from "./company/myproject/Project";
import axios from "axios";
import ProjectDetail from "./company/myproject/ProjectDetail";
import ProjectAllocate from "./company/myproject/ProjectAllocate";
import ProjectLoc from "./company/myproject/ProjectLoc";
import ProjectDocuments from "./company/myproject/ProjectDocuments";
import Employee from "./company/myemployee/Employee";
import EmployeeDetails from "./company/myemployee/EmployeeDetail";
import EmployeeManual from "./company/myemployee/EmployeeManual";
import EmployeeDocuments from "./company/myemployee/EmployeeDocuments";
import AttendanceAcknowledge from "./company/attendance/AttendanceAcknowledge";
import Documents from "./company/document/Documents";
import Contractor from "./company/mycontractor/Contractor";
import ContractorDetail from "./company/mycontractor/ContractorDetail";
import Dashboard from "./company/dashboard/Dashboard"; //company dashboard
import { useDispatch, useSelector } from "react-redux";
import { setCompanyuser } from "./redux/slice/CompanyLoginSlice"
// import { setOneCompany } from "./redux/slices/getOneCompanySlice"
import SubContractorDoc from "./company/mycontractor/SubContractorDoc";

// /.......Employees
import EmployeeLoginHome from "./employee/EmployeeLoginHome";
import EmployeeTimeSheetUser from "./employee/EmployeeTimeSheetUser";
import EmployeeAttendance from "./employee/EmployeeAttendance";
import EmployeeHistory from "./employee/EmployeeHistory";

// redux setup anurag 
import { getProjectData } from "./redux/slice/getallProjectSlice";
import { getSingleCompData } from "./redux/slice/SingleCompSlice";
import { getEmployeeData } from "./redux/slice/EmployeeDataSlice";
import { getAllDocuments } from "./redux/slice/GetCompanyDocSlice";
import { getAllSubcontractor } from "./redux/slice/SubContractorSlice";
import { getAllttendance } from "./redux/slice/AttendanceSlice";
import { getAllCompany } from "./redux/slice/AllCompanySlice"
function App() {

  const [userName, setUserName] = useState("");
  const dispatch = useDispatch()
  console.log(userName[2], "username")

  const AdminLoginData = useSelector(state => state?.adminLogin?.user)
  const admin_id = userName[2]
  const admin_username = userName[3]
  // console.log(admin_id, admin_username, "hello")
  const companyData = useSelector(prev => prev?.companyLogin?.user)
  console.log(companyData, "login")
  // const companyAllData = useSelector(prev => prev?.setOneCompany?.user)
  // const projectAllData = useSelector(prev => prev?.allProject?.user);

  const singleCompany = useSelector(state => state?.singleCompData?.singleComp);
  // const employeeData = useSelector(state => state?.allEmployee?.employees)

  const empdata = useSelector((state) => state?.allEmployee?.employees || []);


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const data = user?.displayName;
        const splitedData = data?.split("&&");
        console.log(user, "user");
        setUserName(splitedData);
        dispatch(setCompanyuser(splitedData))
        console.log(splitedData, "splitedData");
      } else setUserName("");
    });
  }, []);


  // extract company
  const COMPANY_ID = companyData?.[0];
  const COMPANY_USERNAME = companyData?.[1];
  const COMPANY_PARENT_ID = companyData?.[2];
  const COMPANY_PARENT_USERNAME = companyData?.[3];


  // const headers = {
  //   "Content-Type": "application/json"
  // };

  // get company

  useEffect(() => {
    dispatch(getProjectData({
      PROJECT_PARENT_ID: COMPANY_ID,
      PROJECT_PARENT_USERNAME: COMPANY_USERNAME,
      PROJECT_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
      PROJECT_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
    }))
  }, [dispatch, COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME])

  // gettingsingle company data from store

  useEffect(() => {

    dispatch(getSingleCompData({
      COMPANY_ID: COMPANY_ID,
      COMPANY_USERNAME: COMPANY_USERNAME,
      COMPANY_PARENT_ID: COMPANY_PARENT_ID,
      COMPANY_PARENT_USERNAME: COMPANY_PARENT_USERNAME
    }))
  }, [dispatch, COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME])

  // getting the Employee Data from store 
  useEffect(() => {
    dispatch(getEmployeeData({
      EMPLOYEE_PARENT_ID: COMPANY_ID,
      EMPLOYEE_PARENT_USERNAME: COMPANY_USERNAME,
      EMPLOYEE_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
      EMPLOYEE_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME
    }))
  }, [dispatch, COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_USERNAME, COMPANY_PARENT_ID])

  //getting the documents data from store
  useEffect(() => {
    dispatch(getAllDocuments({
      DOCUMENT_REF_ID: COMPANY_ID,
      DOCUMENT_PARENT_USERNAME: COMPANY_USERNAME,
      DOCUMENT_ADMIN_USERNAME: COMPANY_PARENT_USERNAME
    }))
  }, [dispatch, COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_USERNAME])


  //getting the documents data from SUBCONTRACTOR
  useEffect(() => {
    dispatch(getAllSubcontractor({
      SUBCONTRACTOR_PARENT_ID: COMPANY_ID,
      SUBCONTRACTOR_PARENT_USERNAME: COMPANY_USERNAME,
      SUBCONTRACTOR_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
      SUBCONTRACTOR_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME
    }))
  }, [dispatch, COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_USERNAME, COMPANY_PARENT_ID])

  //getting the attendance data from store
  useEffect(() => {
    dispatch(getAllttendance({
      ADMIN_USERNAME: COMPANY_PARENT_USERNAME,
      EMPLOYEE_PARENT_USERNAME: COMPANY_USERNAME,
    }))
  }, [dispatch, COMPANY_USERNAME, COMPANY_PARENT_USERNAME])

  //getting the employeeData from 
  // useEffect(() => {
  //   dispatch(getIndividualEmployee({
  //     EMPLOYEE_ID: userName[0],
  //     ADMIN_USERNAME: userName[3],
  //   }))
  // }, [dispatch, userName[3], userName[0]])


  // getting the data of all company 
  useEffect(() => {
    dispatch(getAllCompany({
      COMPANY_PARENT_ID: admin_id,
      COMPANY_PARENT_USERNAME: admin_username,
    }))
  }, [dispatch, admin_id, admin_username])

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

            {/* My company employees */}
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
              element={<EmployeeDetails />}
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




            {/* for employee login ... */}
            <Route
              path="/employee/home"
              element={<EmployeeLoginHome state={userName} />}
            />
            <Route
              path="/employee/mark-attendance"
              element={<EmployeeAttendance state={userName} />}
            />


            {/*...... for employee section  only ...... */}
            <Route
              path="/employee/project-assigned"
              element={<EmployeeLoginHome state={userName} />}
            />
            <Route
              path="/employee/attendance-history"
              element={<EmployeeTimeSheetUser state={userName} />}
            />
            
              <Route
              path="/employee/attendance/:latt/:lngi/:areas/:loca/:employees/:projects/:projectids"
              element={<EmployeeAttendance state={userName} />}
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

            {/* testform  */}
            {/* <Route path="/formvalidations" element={<ValidationSchemaExample/>} /> */}
          </>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
