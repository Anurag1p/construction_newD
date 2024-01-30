import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from "../firebase";
// icon for employee 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";



const EmployeeNav = ({ empdata, project, history, empName, ProjectName }) => {
    const navigate = useNavigate();
    const logout = async () => {
        try {
            await auth.signOut();
            navigate('/')
        } catch (error) {
            console.error('Error logging out: ', error);
        }
    };


    return (
        <>
            <nav
                className="navbar navbar-expand-lg navbar-dark bg-dark"
                style={{ marginBottom: 0 }}
            >
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <span style={{ border: "2px solid tan", borderRadius: "50%", padding: " 2px 5px" }}>
                            <FontAwesomeIcon icon={faUser} style={{ fontSize: "1.3rem", color: "tan" }} />
                        </span>
                        <span style={{ margin: " 0 10px" }}>{empdata?.EMPLOYEE_NAME} {empName}</span>
                    </a>
                    <button
                        className="btn  my-2 my-sm-0 btn-sm"
                        type="submit"
                        onClick={logout}
                        style={{ color: "tan", border: "1px solid tan" }}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <nav
                className="navbar navbar-expand-lg navbar-light bg-light"
                style={{ height: "40px" }}
            >
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="bg-light text-dark nav-link" to={`/employee/project-assigned`}>{project}</Link>

                            {ProjectName ? <a className="bg-white text-dark nav-link">
                                Attendance - {ProjectName}
                            </a>
                                : <Link className="bg-light text-dark nav-link" to={`/employee/attendance-history`}>{history}</Link>}

                        </div>
                    </div>
                </div>
            </nav>

        </>


    )
}

export default EmployeeNav