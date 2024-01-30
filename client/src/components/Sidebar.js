import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";
import Navbar from "./Navbar";
import { auth } from "../firebase";
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({
  COMPANY_ID,
  COMPANY_USERNAME,
  COMPANY_PARENT_ID,
  COMPANY_PARENT_USERNAME,
  active,
  toggle,
}) => {

  const companyData = useSelector(state => state?.setOneCompany?.user)
  const companyLogin = useSelector(state => state?.companyLogin?.user)

  const companyName = companyLogin[1]?.split('@');

  console.log(companyName, "control");
  const company = companyName[0]?.slice(-(companyName[0].length-1))
  console.log(company, "company")
  const navigate = useNavigate()
  const [data, setData] = useState([]);



  const Logout = async () => {
    try {
      await auth.signOut();
      navigate("/")
    } catch (error) {
      // Handle any errors here
      console.error('Error logging out: ', error);
    }
  };


  const drawerWidth = 0;
  const filterData = companyData?.[0]
  // console.log("sidebar", companyName?.remove(0,5))

  // console.log(filterData, "wh")




  return (
    <>
      <div>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box"
            },
          }}
          variant="permanent"
          anchor="left"
          PaperProps={{
            class: "sidebar display-sidebar-desk border",
            style : {zIndex: 25}
          }}
         
        >
          <div
            className="sidebar-header d-flex p-3 f-20"
            style={{ justifyContent: "space-between" }}
          >
            {/* <h5 className="pt-2" style={{color:"tan"}}>{companyName[0])}</h5> */}
            <h5 className="pt-2" style={{ color: "tan" }}>{companyName[0]?.charAt(0).toUpperCase() + company}</h5>

            <Tooltip title={COMPANY_USERNAME} sx={{zIndex:26}}>
              <Avatar>{filterData?.COMPANY_NAME?.substring(0, 1)}</Avatar>
            </Tooltip>
          
          </div>

          <Divider />

          <List>
            <Link
              to={`/company/dashboard`}
              className="nav-link"
              style={{ background: active === 0 ? "#f3f3f3" : "", zIndex: "-1 !important" }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ fontSize: "16px" }}>
                  Dashboard
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={`/company/projects`}
              className="nav-link"
              style={{ background: active === 1 ? "#f3f3f3" : "" }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ fontSize: "16px" }}>
                  My Projects
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={`/company/employees`}
              className="nav-link"
              style={{ background: active === 2 ? "#f3f3f3" : "" }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ fontSize: "16px" }}>
                  My Employees
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={`/company/attendance`}
              className="nav-link"
              style={{ background: active === 3 ? "#f3f3f3" : "" }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ fontSize: "16px" }}>
                  Attendance
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={`/company/documents`}
              className="nav-link"
              style={{ background: active === 4 ? "#f3f3f3" : "" }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ fontSize: "16px" }}>
                  Documents
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={`/company/subcontractors`}
              className="nav-link"
              style={{ background: active === 5 ? "#f3f3f3" : "" }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ fontSize: "16px" }}>
                  My subcontractors
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider />
          <div
            className="login sidebar_footer position-absolute p-3 "
            style={{ bottom: "0" }}
          >
            <div className="logout_icon ">
              <button
                className="logoutbtn"
                type="submit"
                onClick={Logout}
               
              >
                {/* <LogoutIcon style={{ display: "inline", color:"red", fontSize:"large" }} onClick={Logout} />  */}
                <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={Logout} /> Logout
              </button>
            </div>
          </div>
          <Divider />

        </Drawer>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box"
            }
          }}
          variant="persistent"
          anchor="left"
          PaperProps={{
            class: "sidebar display-sidebar-mobile"
          }}
          open={toggle}
        >
          <div
            className="sidebar-header d-flex p-3 f-20"
            style={{ justifyContent: "space-between" }}
          >
            {/* <h5 className="pt-2">{COMPANY_USERNAME}</h5>
            <Tooltip title={"copany"}>
              <Avatar>{(COMPANY_USERNAME)?.slice(0, 1)}</Avatar>
            </Tooltip> */}
   
          </div>
          <Divider />

          <List>
            <Link
              to={`/company/dashboard`}
              className="nav-link"
              style={{ background: active === 0 ? "#f3f3f3" : "" }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ fontSize: "16px" }}>
                  Dashboard
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={`/company/projects`}
              className="nav-link"
              style={{ background: active === 1 ? "#f3f3f3" : "" }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ fontSize: "16px" }}>
                  My Projects
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={`/company/employees`}
              className="nav-link"
              style={{ background: active === 2 ? "#f3f3f3" : "" }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ fontSize: "16px" }}>
                  My Employees
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={`/company/attendance`}
              className="nav-link"
              style={{ background: active === 3 ? "#f3f3f3" : "" }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ fontSize: "16px" }}>
                  Attendance
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={`/company/documents`}
              className="nav-link"
              style={{ background: active === 4 ? "#f3f3f3" : "" }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ fontSize: "16px" }}>
                  Documents
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={`/company/subcontractors`}
              className="nav-link"
              style={{ background: active === 6 ? "#f3f3f3" : "" }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ fontSize: "16px" }}>
                My Subcontractors
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider />
          <div
            className="login sidebar_footer position-absolute p-3 "
            style={{ bottom: "0" }}
          >
            <div className="logout_icon ">
              <button
                className="text-dark text-uppercase btn-link border-0 bg-lighty"
                type="submit"
                onClick={Logout}
              >
                <LogoutIcon style={{ display: "inline" }} onClick={Logout} />  Logout
              </button>
            </div>
          </div>
          <Divider />
        </Drawer>
      </div>
    </>
  );
};

export default Sidebar;
