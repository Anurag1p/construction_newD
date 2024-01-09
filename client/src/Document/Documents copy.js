// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import { Button } from "@mui/material";

// import SimpleBackdrop from "../components/Backdrop";
// import "../assests/css/document.css"; // Import the CSS filefileN
// import { DataGrid } from '@mui/x-data-grid';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import DocumentModal from "./components/DocumentModal";
// import DocumentCreate from "./DocumentCreate";
// // import env from "react-dotenv";
// import { useParams } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import {
//     Paper,
// } from "@mui/material";
// import Navbar from "../components/Navbar";
// import ExpiryReminder from "../components/ExpiryReminder";

// export default function Document(props) {


//     const [imagesData, setImagesData] = useState([]);
//     const [totalDocuments, setTotalDocuments] = useState(0);
//     const [backdrop, setBackdrop] = useState(false);
//     const [deleteItem, setDeleteItem] = useState("");
//     const [openNav, setOpenNav] = useState(false);

//     // const { id } = useParams();
//     // const param = id.split("&");
//     // const COMPANY_ID = param[0];
//     // const COMPANY_USERNAME = param[1];
//     // const COMPANY_PARENT_ID = param[2];
//     // const COMPANY_PARENT_USERNAME = param[3];

//   const {COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME } = useParams();


//     console.log("COMPANYPARENT :", COMPANY_PARENT_USERNAME);


//     // console.log("DocData", DocData)
//     const [open, setOpen] = React.useState(false);

//     useEffect(() => {
//         getalldocument();
//     }, [deleteItem]);




//     // function to download the file 
//     const downloadFile = (base64Data, fileName) => {
//         const link = document.createElement("a");
//         link.href = `data:application/octet-stream;base64,${base64Data}`;
//         link.download = fileName;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };


//     // Function to upload  the documents 

//     const MyScreen = styled(Paper)((props) => ({
//         height: "calc(100vh - 32px)",
//         padding: 0,
//         paddingBottom: "0",
//         overflow: "auto",
//         borderRadius: 0,
//         Border: 0,
//         display: props.screenIndex ? "block" : "none",
//     }));

//     const handleClick = (event) => {
//         handleOpen();
//     };
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);


//     const getalldocument = async () => {


//         const requestData = {
//             DOCUMENT_REF_ID: COMPANY_ID,
//             DOCUMENT_ADMIN_USERNAME: COMPANY_PARENT_USERNAME
//         };


//         try {
//             const response = await axios.put("/api/get_all_document", requestData);

//             if (!response.data) {
//                 throw new Error("Response data is empty");
//             }

//             const data = response.data;
//             console.log("requestdata", data);

//             setImagesData(data);
//             setTotalDocuments(data.result?.length || 0);

//             // console.log("data", data.result);
//         } catch (error) {
//             console.log("Error Fetching Data :", error);
//         }
//     };

//     // const Demo = styled("div")(({ theme }) => ({
//     //     backgroundColor: theme.palette.background.paper,
//     // }));

//     // Function to download the uploaded documents 
//     const handleDownload = async (documentId, fileName) => {
//         console.log(documentId, fileName, "filename")
//         try {
//             const data = {
//                 DOCUMENT_ID: documentId,
//                 DOCUMENT_ADMIN_USERNAME: COMPANY_PARENT_USERNAME,
//             };

//             const config = {
//                 method: "put",
//                 maxBodyLength: Infinity,
//                 url: "/api/download_document",
//                 data:data,
//             };

//             const response = await axios.request(config);
//             console.log(response, "this is response")
//             downloadFile(response.data, fileName);


//         } catch (error) {
//             console.log(error);
//         }

//     };

//     const handleDelDoc = async (e, documentId) => {
//         setBackdrop(true);
//         console.log(documentId);

//         const data = {
//             DOCUMENT_ID: documentId,
//             DOCUMENT_ADMIN_USERNAME: COMPANY_PARENT_USERNAME,
//         };
//         console.log("Data found 1:", data);

//         try {
//             const response = await fetch(`/api/delete_document/${documentId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (response.ok) {
//                 const jsonResponse = await response.json();
//                 console.log("Response data found:", jsonResponse);
//                 setDeleteItem(jsonResponse);
//                 setBackdrop(false);
//                 toast.success("Document Deleted successfully!", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 1000,
//                 });
//             } else {
//                 // Handle the response for non-2xx status codes
//                 console.error(response.status, response.statusText);
//                 toast.error('Document not found!', {
//                     // Show for 2 seconds
//                 });
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error('An error occurred while deleting the document.', {
//                 // Show for 2 seconds
//             });
//         }
//     };

//     const columns = [
//         { field: 'id', headerName: 'ID', width: 90 },
//         {
//             field: 'documentName',
//             headerName: 'Document Name',
//             width: 180,
//             editable: false,
//         },
//         {
//             field: 'documentSize',
//             headerName: 'Document Size',
//             width: 150,
//             editable: false,

//         },
//         {
//             field: 'uploadDate',
//             headerName: 'Document Upload Date',
//             type: 'number',
//             width: 180,
//             editable: false,

//         },

//         {
//             field: 'documentType',
//             headerName: 'Document Type',
//             type: 'number',
//             width: 150,
//             editable: false,
//         },
//         {
//             field: 'ExpiryDate',
//             headerName: 'Document Expiry',
//             description: 'This column has a value getter and is not sortable.',
//             sortable: false,
//             width: 160,
//             editable: false,
//             renderCell: (cellValues) => {
//               return  (<ExpiryReminder data={cellValues?.value} />)
//             }

//         },
//         {
//             field: "download",
//             headerName: "Download",
//             width: 120,
//             renderCell: (cellValues) => {
//                 return (
//                     <Button
//                         variant="contained"
//                         className="view-btn primary btn btn-success"
//                         style={{ padding: "2px 8px" }}
//                         onClick={(e) => {
//                             handleDownload(cellValues.id, cellValues.row.documentName);
//                         }}
//                     >
//                         Download
//                     </Button>
//                 );
//             },
//         },
//         {
//             field: "delete",
//             headerName: "Delete",
//             width: 100,


//             renderCell: (cellValues) => {
//                 return (
//                     <Button
//                         variant="contained"
//                         className="view-btn "
//                         color="error"
//                         style={{ padding: "2px 2px" }}
//                         onClick={(e) => {
//                             handleDelDoc(e, cellValues.id);
//                         }}
//                     >
//                         Delete
//                     </Button>
//                 );
//             },
//         },

//     ];

//     // Function to format date as dd/mm/yy
//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-GB', options).replace(/\//g, '-');
//     };

//     const rows = imagesData?.result?.map((item) => ({
//         id: item.DOCUMENT_ID,
//         documentName: item.DOCUMENT_FILEDATA?.originalname || '', // Add conditional check here
//         documentSize: item.DOCUMENT_FILEDATA?.size || '', // Add conditional check here
//         uploadDate: formatDate(item.created),
//         documentType: item.DOCUMENT_FILEDATA?.mimetype || '', // Add conditional check here
//         ExpiryDate: formatDate(item.DOCUMENT_EXPIRY_DATE) || '', // Add conditional check here
//     })) || [];

//     return (
//         <>
//             <Sidebar
//                 COMPANY_ID={COMPANY_ID}
//                 COMPANY_USERNAME={COMPANY_USERNAME}
//                 COMPANY_PARENT_ID={COMPANY_PARENT_ID}
//                 COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
//                 active={4}
//                 toggle={openNav}
//             />
//             <Box className="box" >
//                 <Button
//                     sx={{ color: "#277099" }}
//                     className="btn"
//                 >Company Documents</Button>

//                 <Navbar toggle={() => setOpenNav((e) => !e)} />
//                 <DocumentCreate
//                     name={"Employee"}
//                     COMPANY_ID={COMPANY_ID}
//                     COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
//                     update={getalldocument}

//                 />

//                 <MyScreen sx={{ display: "block", padding: 2 }}>
//                     <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>

//                         <DataGrid
//                             rows={rows}
//                             columns={columns}
//                             sx={{ border: "none" }}
//                             initialState={{
//                                 pagination: {
//                                     paginationModel: {
//                                         pageSize: 20,
//                                     },
//                                 },
//                             }}
//                             pageSizeOptions={[5]}
//                             disableMultipleSelection
//                             density="compact"
//                         />
//                     </Box>
//                 </MyScreen>
//             </Box>


//             <SimpleBackdrop open={backdrop} />

//         </>
//     );
// }