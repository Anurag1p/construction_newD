import React, { useEffect, useState, useMemo } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import CreateProjectDoc from "./CreateProjectDoc";
import { Box, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
// import axios from "axios";

// ICONS MUI
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import DescriptionIcon from "@mui/icons-material/Description";
// import InsertChartIcon from "@mui/icons-material/InsertChart";
// import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import { toast } from "react-toastify";
// import ExpiryReminder from "../../components/ExpiryReminder";
// import { RotatingLines } from "react-loader-spinner";

import ProjectNav from "./ProjectNav";
import DocReusable from "../../components/DocReusable";

const ProjectDocuments = () => {
  const filteredProject = useLocation();
  const filterData = filteredProject?.state[0]
  const COMPANY_ID = filteredProject?.state[1]
  const COMPANY_USERNAME = filteredProject?.state[2]
  const COMPANY_PARENT_ID = filteredProject?.state[3]
  const COMPANY_PARENT_USERNAME = filteredProject?.state[4]

  return (
    <>
      <Box
        style={{
          display: "block",
          height: "100vh",
        }}
        className="box position-absolute"
      >
        <ProjectNav filterData={filterData} active={4} COMPANY_ID={COMPANY_ID} COMPANY_USERNAME={COMPANY_USERNAME} COMPANY_PARENT_ID={COMPANY_PARENT_ID} COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME} />
        <div className="myscreen p-3">

          <DocReusable
            createEndpoint="/api/create_document"
            getDocEndPoint="/api/get_all_document"
            documentType="Project Document"
            deleteApiEndpoint="/api/delete_document"
            downloadApiEndpoint="/api/download_document"
            DOCUMENT_REF_ID={filterData?.PROJECT_ID}
            DOCUMENT_PARENT_USERNAME={filterData?.PROJECT_USERNAME}
            DOCUMENT_ADMIN_USERNAME={filterData?.PROJECT_MEMBER_PARENT_USERNAME}
          />
          {/* {resStatus === true ? (
            

            ) : resStatus === "error" ? (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <small className="text-dark">
                  <p>Check your connection and try again. :(</p>
                  <center>
                    <button
                      onClick={}
                      className="btn btn-sm btn-secondary"
                    >
                      Retry
                    </button>
                  </center>
                </small>
              </div>
            ) : (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <RotatingLines
                  strokeColor="#2D5169"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="50"
                  visible={true}
                />
              </div>
            )} */}
        </div>
      </Box>
    </>
  );
};

export default ProjectDocuments;
