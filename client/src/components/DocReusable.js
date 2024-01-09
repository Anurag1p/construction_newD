import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Container } from "@mui/material";
import moment from "moment-timezone";
import "../assests/css/document.css";
import { DataGrid } from '@mui/x-data-grid';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

import {
    Paper,
} from "@mui/material";
import ExpiryReminder from "./ExpiryStatus";


// doc create 
import Modal from "@mui/material/Modal";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Dropzone from "react-dropzone";
import "react-toastify/dist/ReactToastify.css";

// mui icons 
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { RotatingLines } from "react-loader-spinner";
import Animation from "./Animations";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};


const DocReusable = (props) => {
    const { DOCUMENT_REF_ID,
        createEndpoint,
        getDocEndPoint,
        deleteApiEndpoint,
        downloadApiEndpoint,
        DOCUMENT_PARENT_USERNAME,
        DOCUMENT_ADMIN_USERNAME
    } = props

    console.log(props, "this is dynamic porps")
    const [imagesData, setImagesData] = useState([]);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [backdrop, setBackdrop] = useState(false);
    const [deleteItem, setDeleteItem] = useState("");
    const [openNav, setOpenNav] = useState(false);
    // const { COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME } = useParams();
    const [resStatus, setResStatus] = useState(false); //adding newline
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = React.useState(false);

    const [formData, setFormData] = useState({
        selectedFile: null,
        DOCUMENT_EXPIRY_DATE: "",
        DOCUMENT_TYPE: "",
    });

    useEffect(() => {
        getalldocument();
    }, [formData, deleteItem]);

    // function to download the file 
    const downloadFile = (base64Data, fileName) => {
        const link = document.createElement("a");
        link.href = `data:application/octet-stream;base64,${base64Data}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // const apiEndpoint = "/api/create_document";
    // Function to upload  the documents 

    const MyScreen = styled(Paper)((props) => ({
        height: "calc(100vh - 32px)",
        padding: 0,
        paddingBottom: "0",
        overflow: "auto",
        borderRadius: 0,
        Border: 0,
        display: props.screenIndex ? "block" : "none",
    }));

    const handleClick = (event) => {
        handleOpen();
    };
    const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);


    const getalldocument = async () => {

        const requestData = {
            DOCUMENT_REF_ID: DOCUMENT_REF_ID,
            DOCUMENT_ADMIN_USERNAME: DOCUMENT_ADMIN_USERNAME,
            DOCUMENT_PARENT_USERNAME: DOCUMENT_PARENT_USERNAME,
        };
        try {
            const response = await axios.put(getDocEndPoint, requestData);

            if (!response.data) {
                throw new Error("Response data is empty");
            }

            const data = response.data;
            // console.log("requestdata", data);
            setIsLoading(true);
            setResStatus(true);
            setImagesData(data);
            setIsLoading(false);
            setTotalDocuments(data.result?.length || 0);
            console.log("data documents", data.result);
        } catch (error) {
            setIsLoading(false);
            console.log("Error Fetching Data :", error);
        }
    };

    // Function to download the uploaded documents 
    const handleDownload = async (documentId, fileName) => {
        // console.log(documentId, fileName, "filename")
        try {
            const data = {
                DOCUMENT_ID: documentId,
                DOCUMENT_ADMIN_USERNAME: DOCUMENT_ADMIN_USERNAME,
            };

            const config = {
                method: "put",
                maxBodyLength: Infinity,
                url: downloadApiEndpoint,
                data: data,
            };

            const response = await axios.request(config);
            downloadFile(response.data, fileName.name);


        } catch (error) {
            console.log(error);
        }

    };

    const handleDelDoc = async (e, documentId) => {
        // setBackdrop(true);
        setResStatus(true);
        // console.log(documentId);

        const data = {
            DOCUMENT_ID: documentId,
            DOCUMENT_ADMIN_USERNAME: DOCUMENT_ADMIN_USERNAME,
        };
        // console.log("Data found 1:", data);

        try {
            const response = await fetch(`${deleteApiEndpoint}/${documentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                // console.log("Response data found:", jsonResponse);
                setDeleteItem(jsonResponse);
                // setBackdrop(false);
                setResStatus(false);

                toast.success("Document Deleted successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
            } else {
                // Handle the response for non-2xx status codes
                console.error(response.status, response.statusText);
                toast.error('Document not found!', {
                    // Show for 2 seconds
                });
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while deleting the document.', {
                // Show for 2 seconds
            });
        }
    };


    // function for converting the files into kb and mb 
    const formatSize = (bytes) => {
        if (bytes >= 1048576) {
            return (bytes / 1048576).toFixed(2) + ' MB';
        } else if (bytes >= 1024) {
            return (bytes / 1024).toFixed(2) + ' KB';
        } else {
            return bytes + ' Bytes';
        }
    };


    const getFileIcon = (fileType) => {
        const fileTypeLowerCase = fileType.toLowerCase();
        if (fileTypeLowerCase.includes('pdf')) {
            return <DescriptionIcon color="error" />;
        } else if (fileTypeLowerCase.includes('excel') || fileTypeLowerCase.includes('spreadsheet')) {
            return <InsertChartIcon color="primary" />;
        } else if (fileTypeLowerCase.includes('word') || fileTypeLowerCase.includes('document')) {
            return <AssignmentIcon color="primary" />;
        } else if (fileTypeLowerCase.includes('jpeg') || fileTypeLowerCase.includes('jpg')) {
            return <InsertPhotoIcon color="primary" />;
        } else if (fileTypeLowerCase.includes('csv')) {
            return <InsertDriveFileIcon color="primary" />;
        } else {
            return <InsertDriveFileIcon color="disabled" />;
        }
    };

    const renderDocumentNameCell = (cellValues) => {
        const { name, fileType } = cellValues.value;
        const icon = getFileIcon(fileType);

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {icon}
                <span style={{ marginLeft: '8px' }}>{name}</span>
            </div>
        );
    };

    const columns = [
        { field: 'sr', headerName: 'S No.', width: 60 },
        {
            field: 'documentName',
            headerName: 'Document Name',
            width: 180,
            renderCell: renderDocumentNameCell,
        },
        { field: 'id', headerName: 'ID', width: 60 },
        {
            field: 'documentSize',
            headerName: "Size",
            description: 'Document Size',
            width: 80,
            editable: false,
        },
        {
            field: 'uploadDate',
            headerName: 'Upload Date',
            type: 'number',
            width: 120,
            editable: false,

        },
        {
            field: 'documentExpDate',
            headerName: 'Expiry Date',
            description: 'Document Expiry Date',
            width: 120,
            editable: false,
        },
        {
            field: 'documentIdType',
            headerName: 'Document Type',
            description: 'Document Type',
            type: 'text',
            width: 120,
            editable: false,
            sortable: true,

        },

        {
            field: 'ExpiryDateStatus',
            headerName: 'Expiry Status',
            description: 'Document Expiry',
            sortable: true,
            width: 180,
            editable: false,
            renderCell: (cellValues) => {

                return (<ExpiryReminder data={cellValues?.value} />)
            },
            size: "small"


        },
        {
            field: "download",
            headerName: "Download",
            width: 120,
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        className="view-btn primary btn btn-success"
                        style={{ padding: "2px 8px" }}
                        onClick={(e) => {
                            handleDownload(cellValues.id, cellValues.row.documentName);
                        }}
                    >
                        Download
                    </Button>
                );
            },
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 100,


            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        className="view-btn "
                        color="error"
                        style={{ padding: "2px 2px" }}
                        onClick={(e) => {
                            handleDelDoc(e, cellValues.id);
                        }}
                    >
                        Delete
                    </Button>
                );
            },
        },
    ];


    // this is a new function using moment for date conversion 
    const formatDate = (dateString, withTimezone = false) => {
        const userTimeZone = moment.tz.guess();
        const date = moment(dateString).tz(userTimeZone);

        const formattedDate = withTimezone
            ? date.format("YYYY-MM-DD HH:mm:ss z") // Include time and timezone
            : date.format("YYYY-MM-DD"); // Date only

        return formattedDate;
    };


    // after new
    const rows = imagesData?.result?.map((item, index) => ({
        id: item.DOCUMENT_ID,
        sr: index + 1,
        documentName: {
            name: item.DOCUMENT_FILEDATA?.originalname || '',
            fileType: item.DOCUMENT_FILEDATA?.mimetype || '',
        },
        documentSize: formatSize(item.DOCUMENT_FILEDATA?.size) || '',
        uploadDate: formatDate(item.createdAt),
        documentType: item.DOCUMENT_FILEDATA?.mimetype || '',
        ExpiryDateStatus: formatDate(item.DOCUMENT_EXPIRY_DATE) || '',
        documentExpDate: formatDate(item.DOCUMENT_EXPIRY_DATE) || '',
        documentIdType: item.DOCUMENT_TYPE || '',
    })) || [];


    // for create document 

    // const [open, setOpen] = useState(false);
    const [file, setFile] = useState([]);
    // const [backdrop, setBackdrop] = useState(false);


    //   console.log("these are the requested data for api call :=> ", COMPANY_ID, COMPANY_PARENT_USERNAME,COMPANY_USERNAME, update, apiEndpoint)
    const [isSubmitting, setIsSubmitting] = useState(false);

    // const handleOpen = () => setOpen(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpen(false);
        setBackdrop(true);

        if (isSubmitting) {
            return; // Prevent multiple submissions
        }

        setIsSubmitting(true);

        if (!file || !formData.DOCUMENT_EXPIRY_DATE) {
            setIsSubmitting(false);
            toast.error("Please select a file and enter an expiry date.");
            return;
        }

        const currentDate = new Date();
        const selectedDate = new Date(formData.DOCUMENT_EXPIRY_DATE);

        if (selectedDate <= currentDate) {
            setIsSubmitting(false);
            toast.error("Expiry date must be greater than the document upload date.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
            return;
        }

        const data = new FormData();

        data.append("file", file);
        data.append("DOCUMENT_REF_ID", DOCUMENT_REF_ID);
        data.append("DOCUMENT_ADMIN_USERNAME", DOCUMENT_ADMIN_USERNAME);
        data.append("DOCUMENT_PARENT_USERNAME", DOCUMENT_PARENT_USERNAME);
        data.append("DOCUMENT_EXPIRY_DATE", formData.DOCUMENT_EXPIRY_DATE);
        data.append("DOCUMENT_TYPE", formData.DOCUMENT_TYPE);

        try {
            const response = await axios.post(createEndpoint, data);
            if (response.data.operation === "successfull") {
                setOpen(false);
                //   update();
                toast.success("Document uploaded successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
                setFile(file ? file.name : "");
                setFormData({
                    selectedFile: null,
                    DOCUMENT_EXPIRY_DATE: "",
                    DOCUMENT_TYPE: "",
                });
            } else {
                toast.error("Failed to upload document.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while uploading the document.");
        } finally {
            setIsSubmitting(false);
            setBackdrop(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            selectedFile: null,
            DOCUMENT_EXPIRY_DATE: "",
            DOCUMENT_TYPE: "",
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            {/* <CreateDoc
                COMPANY_ID={COMPANY_ID}
                COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                COMPANY_USERNAME={COMPANY_USERNAME}
                update={getalldocument}
                apiEndpoint={apiEndpoint}
            /> */}

            <Button
                onClick={handleOpen}
                sx={{ color: "#277099" }}
                className="btn rounded-0 border-0 rounded-0 text-light"
                variant="contained"
                size="small"
            >
                + Add New Document
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modalWidth"
                style={{ zIndex: 9999999 }}
            >
                <Container
                    id="content"
                    style={{ height: "100vh", position: "relative" }}
                    maxWidth="xl"
                >
                    <Box sx={style}>
                        <div className="container">
                            <form onSubmit={handleSubmit}>
                                <Dropzone onDrop={(acceptedFiles) => setFile(...acceptedFiles)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section
                                            className="p-4 rounded-2"
                                            style={{
                                                background: "#f2f2f2",
                                                border: "2px dashed gray",
                                            }}
                                            {...getRootProps()}
                                        >
                                            <div>
                                                <input {...getInputProps()} />
                                                <p>
                                                    Drag 'n' drop some files here, or click to select
                                                    files
                                                </p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                                {file.name && (
                                    <p className="text-success fs-7 fz-2 pt-2">
                                        Selected File: {file?.name}
                                    </p>
                                )}

                                <div className="row mb-2">
                                    <div className="form-group col-xl-12">
                                        <label className="pb-2 fs-6 rounded p-2">
                                            Select Expiry Date
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control mb-2 pb-2 pt-2 form-control-2 rounded-0"
                                            id="DOCUMENT_EXPIRY_DATE"
                                            name="DOCUMENT_EXPIRY_DATE"
                                            onChange={handleInputChange}
                                            value={formData.DOCUMENT_EXPIRY_DATE}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="form-group col-xl-12">
                                        <label className="pb-2 fs-6 rounded p-2">
                                            Document Type
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control mb-2 pb-2 pt-2 form-control-2 rounded-0"
                                            id="DOCUMENT_TYPE"
                                            name="DOCUMENT_TYPE"
                                            onChange={handleInputChange}
                                            value={formData.DOCUMENT_TYPE}
                                            placeholder="Document Type"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-8">
                                        <button
                                            type="submit"
                                            className="btn btn-info text-white"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Uploading..." : "Upload document"}
                                            <ArrowCircleUpIcon
                                                fontSize="small"
                                                className="ml-2"
                                            />
                                        </button>{" "}
                                    </div>
                                    <div className="form-group col-4">
                                        <button
                                            onClick={handleClose}
                                            className="btn btn-danger text-white pl-2 pr-2"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Box>
                    <ToastContainer position="top-center" autoClose={1000} />
                </Container>
            </Modal>

            <MyScreen sx={{ display: "block", padding: 2 }}>
                <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
                    {isLoading === true ?
                        <Animation /> : isLoading === false ?
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                sx={{ border: "none", height: '80vh' }}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 14,
                                        },
                                    },
                                }}
                                pageSizeOptions={[10]}
                                disableMultipleSelection
                                density="compact"

                                getRowId={(row) => row.id}
                            />
                            : isLoading === "error" ? <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%,-50%)",
                                }}
                            >
                                <small className="text-dark"><p>Check your connection and try again. :(</p><center><button onClick={getalldocument} className="btn btn-sm btn-secondary">Retry</button></center></small>
                            </div> : <div
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
                            </div>}

                </Box>
            </MyScreen>
        </>
    )
}

export default DocReusable