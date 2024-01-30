
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import EmployeeNav from "./EmployeeNav";

const EmployeeLoginHome = ({ state }) => {
  const navigate = useNavigate();
  const [project, setProject] = useState([]);
  const [empdata, setEmpdata] = useState([]);

  console.log(state[0], state[3], "hianu")


  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const empDataConfig = {
          method: "put",
          maxBodyLength: Infinity,
          url: "/api/emp_data_one",
          data: {
            ADMIN_USERNAME: state[3],
            EMPLOYEE_ID: state[0],
          },
        };

        const response = await axios.request(empDataConfig);
        const data = response.data;

        if (data.result) {
          setEmpdata(data.result);
        }
        console.log(data, "Employee data");
      } catch (error) {
        console.error(error, "Error fetching employee data");
      }
    };

    fetchEmployeeData();
  }, [state[3]]);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const requests = empdata.EMPLOYEE_ASSIGN.map((item) => {
          const {
            PROJECT_ID,
            PROJECT_PARENT_ID,
            PROJECT_MEMBER_PARENT_ID,
            PROJECT_MEMBER_PARENT_USERNAME,
            PROJECT_USERNAME,
          } = item;

          const projectData = {
            PROJECT_ID,
            PROJECT_PARENT_ID,
            PROJECT_MEMBER_PARENT_ID,
            PROJECT_MEMBER_PARENT_USERNAME,
            PROJECT_USERNAME,
          };

          return axios.put("/api/get_projects_one", projectData);
        });

        const responses = await Promise.all(requests);

        const arry = responses.map((response) => response.data.result[0]);
        if (arry) {
          setProject(arry);
          console.log(arry, "Projects data");
        }
      } catch (error) {
        console.error(error, "Error fetching projects data");
      }
    };

    // Check if empdata.EMPLOYEE_ASSIGN has changed
    if (empdata.EMPLOYEE_ASSIGN && empdata.EMPLOYEE_ASSIGN.length > 0) {
      fetchProjectsData();
    }
  }, [empdata.EMPLOYEE_ASSIGN]);


  return (
    <>
      <div className="container-fluid g-0">

        <EmployeeNav empdata={empdata} project="My Projects" history="Attendance History" />

        {project.length > 0 ? (
          <div className="container">
            <div className="row">
              <div className="col-12 d-lg-none overflow-auto" />
              <h5 className="py-4 text-underline">My Projects</h5>

              <table className="table table-striped table-sm">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">S No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Project Id</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Punch</th>
                  </tr>
                </thead>

                <tbody>
                  {project.map((item, index) => (
                    <tr key={item?.PROJECT_ID}>
                      <th scope="row">{index + 1}</th>
                      <td>{item?.PROJECT_NAME}</td>
                      <td>{item?.PROJECT_ID}</td>
                      <td>{item?.PROJECT_START_DATE}</td>
                      <td>{item?.PROJECT_END_DATE}</td>
                      <td>
                        <Link
                          to={`/employee/attendance/${item?.LATITUDE}/${item?.LONGITUDE}/${item?.AREA}/${item?.LOCATION_NAME}/${empdata?.EMPLOYEE_NAME}/${item?.PROJECT_NAME}/${item?.PROJECT_ID}`}
                          className="btn btn-sm btn-primary"
                        >
                          Visit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="container position-absolute top-50 text-center" style={{ transform: "translate(-50%,-50%)", left: "50%" }}>
            Currently no project is assigned for you.
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeeLoginHome;

