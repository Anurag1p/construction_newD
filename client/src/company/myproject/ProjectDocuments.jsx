import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import ProjectNav from "./ProjectNav";
import DocReusable from "../../components/DocReusable";

const ProjectDocuments = () => {
  const filteredProject = useLocation();
  console.log(filteredProject, "uselocation")

  const filterData = filteredProject?.state[0]
  // const COMPANY_ID = filteredProject?.state[1]
  // const COMPANY_USERNAME = filteredProject?.state[2]
  // const COMPANY_PARENT_ID = filteredProject?.state[3]
  // const COMPANY_PARENT_USERNAME = filteredProject?.state[4]

  return (
    <>
      <Box
        style={{
          display: "block",
          height: "100vh",
        }}
        className="box position-absolute"
      >
        {/* <ProjectNav filterData={filterData} active={4} COMPANY_ID={COMPANY_ID} COMPANY_USERNAME={COMPANY_USERNAME} COMPANY_PARENT_ID={COMPANY_PARENT_ID} COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME} /> */}
        <ProjectNav filterData={filterData} active={4} />
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
          
        </div>
      </Box>
    </>
  );
};

export default ProjectDocuments;
