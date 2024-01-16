import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
// import moment from "moment-timezone";
import SimpleBackdrop from "../../components/Backdrop";
import "../../assests/css/document.css";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
    Paper,
} from "@mui/material";
import Navbar from "../../components/Navbar";

import DocReusable from "../../components/DocReusable";
import { useDispatch, useSelector } from "react-redux";

export default function Document(props) {

    const [backdrop, setBackdrop] = useState(false);
    const [openNav, setOpenNav] = useState(false);

    const companyData = useSelector((prev) => prev?.companyLogin?.user);
    const COMPANY_ID = companyData[0];
    const COMPANY_USERNAME = companyData[1];
    const COMPANY_PARENT_ID = companyData[2];
    const COMPANY_PARENT_USERNAME = companyData[3];

    const dispatch = useDispatch();

    // const { COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME } = useParams();
    console.log("myprops : =>", companyData)
    const companyDoc = useSelector(state => state?.companyDocuments?.documents)
    console.log(companyDoc, "documents data")

    return (
        <>
            <Sidebar
                COMPANY_ID={COMPANY_ID}
                COMPANY_USERNAME={COMPANY_USERNAME}
                COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                active={4}
                toggle={openNav}
            />
            <Box className="box" >
                <Button
                    size="small"
                    variant={"outlined"}
                    className="btn button  bg-white"
                >
                    Company Documents
                </Button>

                <Navbar toggle={() => setOpenNav((e) => !e)} />


                <DocReusable
                    createEndpoint="/api/create_document"
                    getDocEndPoint="/api/get_all_document"
                    documentType="Employee"
                    deleteApiEndpoint="/api/delete_document"
                    downloadApiEndpoint="/api/download_document"
                    DOCUMENT_REF_ID={props.COMPANY_ID}
                    DOCUMENT_PARENT_USERNAME={props.COMPANY_USERNAME}
                    DOCUMENT_ADMIN_USERNAME={props.COMPANY_PARENT_USERNAME}
                />
            </Box>
            <SimpleBackdrop open={backdrop} />

        </>
    );
}