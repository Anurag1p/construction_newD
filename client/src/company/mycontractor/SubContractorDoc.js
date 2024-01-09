
import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import SubContractorNav  from "./ContractorNav";
import DocReusable from "../../components/DocReusable";


const SubContractorDoc = () => {

    const filteredProject = useLocation();
    const filterData = filteredProject?.state[0]
    const COMPANY_ID = filteredProject?.state[1]
    const COMPANY_USERNAME = filteredProject?.state[2]
    const COMPANY_PARENT_ID = filteredProject?.state[3]
    const COMPANY_PARENT_USERNAME = filteredProject?.state[4]
    console.log("filteredData => ", filterData)
    console.log("filter Project =>", filteredProject)

    return (
        <>
            <Box
                style={{
                    display: "block",
                    height: "100vh",
                }}
                className="box position-absolute"
            >
                <SubContractorNav filterData={filterData} active={2} COMPANY_ID={COMPANY_ID} COMPANY_USERNAME={COMPANY_USERNAME} COMPANY_PARENT_ID={COMPANY_PARENT_ID} COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME} />
                <div className="myscreen p-3">

                    <DocReusable
                        createEndpoint="/api/create_document"
                        getDocEndPoint="/api/get_all_document"
                        documentType="Project Document"
                        deleteApiEndpoint="/api/delete_document"
                        downloadApiEndpoint="/api/download_document"
                        DOCUMENT_REF_ID={filterData?.SUBCONTRACTOR_ID}
                        DOCUMENT_PARENT_USERNAME={filterData?.SUBCONTRACTOR_USERNAME}
                        DOCUMENT_ADMIN_USERNAME={filterData?.SUBCONTRACTOR_MEMBER_PARENT_USERNAME}
                    />

                </div>
            </Box>
        </>
    )
}

export default SubContractorDoc;



