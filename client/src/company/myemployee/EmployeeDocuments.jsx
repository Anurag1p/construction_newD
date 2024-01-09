import React from "react";
import Box from "@mui/material/Box";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import EmployeeNav from "./EmployeeNav";
import DocReusable from "../../components/DocReusable";

const EmployeeDocuments = () => {

  const filteredEmployee = useLocation();
  const filterData = filteredEmployee?.state[0];
  const COMPANY_ID = filteredEmployee?.state[1];
  const COMPANY_USERNAME = filteredEmployee?.state[2];
  const COMPANY_PARENT_ID = filteredEmployee?.state[3];
  const COMPANY_PARENT_USERNAME = filteredEmployee?.state[4];

  return (
    <Box
      style={{
        display: "block",
        height: "100vh",
      }}
      className="box position-absolute"
    >

      <EmployeeNav
        filterData={filterData}
        active={4}
        COMPANY_ID={COMPANY_ID}
        COMPANY_USERNAME={COMPANY_USERNAME}
        COMPANY_PARENT_ID={COMPANY_PARENT_ID}
        COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
      />
      <div className="myscreen p-3">
        <>
          <DocReusable
            createEndpoint="/api/create_document"
            getDocEndPoint="/api/get_all_document"
            documentType="Employee Document"
            deleteApiEndpoint="/api/delete_document"
            downloadApiEndpoint="/api/download_document"
            DOCUMENT_REF_ID={filterData?.EMPLOYEE_ID}
            DOCUMENT_PARENT_USERNAME={filterData?.EMPLOYEE_USERNAME}
            DOCUMENT_ADMIN_USERNAME={filterData?.EMPLOYEE_MEMBER_PARENT_USERNAME}
          />

        </>
      </div>
    </Box>
  );
};

export default EmployeeDocuments;
