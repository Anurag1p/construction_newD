// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import { Button } from "@mui/material";
// import pdf from "../assests/images/pdf.png";
// import jpg from "../assests/images/jpg.png";
// import png from "../assests/images/png.png";
// import AddIcon from "@mui/icons-material/Add";
// import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
// import ViewListIcon from "@mui/icons-material/ViewList";
// import DeleteIcon from "@mui/icons-material/Delete";
// import env from "react-dotenv";

// import "../assests/css/document.css" // Import the CSS file

// export default function ProjectUpload(props) {
//   const [postImage, setPostImage] = useState({
//     myFile: "",
//   });
//   const [selectedFileName, setSelectedFileName] = useState("");
//   const [imagesData, setImagesData] = useState({});
//   const [show, setShow] = useState(false);
//   const [totalDocuments, setTotalDocuments] = useState(0);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
//   const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

//   const [fileSelected, setFileSelected] = useState(false);

//   // New state to manage visibility of the documents list
//   const [showDocuments, setShowDocuments] = useState(false);
//   // this is data of company for fetch the company username
//   const DocData = props.empData;

//   useEffect(() => {
//     getalldocument();
//   }, []);

//   const headers = {
//     "Content-Type": "multipart/form-data",
//     authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
//   };

//   // Download file
//   const downloadFile = (base64Data, fileName) => {
//     const link = document.createElement("a");
//     link.href = `data:application/octet-stream;base64,${base64Data}`;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   //create document
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await axios
//       .post("/api/create_document", postImage.myFile, {
//         headers,
//       })
//       .then((response) => {
//         getalldocument();
//         setSuccessMessage("Document uploaded successfully!");
//         setSelectedFileName("");

//         setTimeout(() => setSuccessMessage(""), 1000);
//       })
//       .catch((error) => {
//         console.error(error);
//         setSuccessMessage("");
//       });
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFileSelected(true);
//       const formdata = new FormData();
//       formdata.append("file", file);
//       formdata.append("DOCUMENT_REF_ID", DocData.COMPANY_ID);
//       formdata.append(
//         "DOCUMENT_ADMIN_USERNAME",
//         DocData.COMPANY_PARENT_USERNAME
//       );
//       setPostImage({ myFile: formdata });
//       setSelectedFileName(file.name);
//     } else {
//       setFileSelected(false);
//     }
//   };

//   //get all Document
//   const getalldocument = () => {
//     try {
//       var myHeaders = new Headers();
//       myHeaders.append("authorization_key", "qzOUsBmZFgMDlwGtrgYypxUz");
//       myHeaders.append("Content-Type", "application/json");

//       var raw = JSON.stringify({
//         DOCUMENT_REF_ID: DocData.COMPANY_ID,
//         DOCUMENT_ADMIN_USERNAME: DocData.COMPANY_PARENT_USERNAME,
//       });

//       var requestOptions = {
//         method: "PUT",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow",
//       };

//       fetch("/api/get_all_document", requestOptions)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Network response was not ok");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           // Assuming setImagesData is a state-setting function for a React component
//           setImagesData(data);
//           setTotalDocuments(data.result?.length || 0)
//         })
//         .catch((error) => {
//           console.log("Error Fetching Data :", error);
//         });
//     } catch (error) {
//       console.log("Error Fetching Data :", error);
//     }
//   };

//   const Demo = styled("div")(({ theme }) => ({
//     backgroundColor: theme.palette.background.paper,
//   }));


//   const handleDownload = async (documentId, fileName) => {
//     try {
//       const data = JSON.stringify({
//         DOCUMENT_ID: documentId,
//         DOCUMENT_ADMIN_USERNAME: DocData.COMPANY_PARENT_USERNAME,
//       });

//       const config = {
//         method: "put",
//         maxBodyLength: Infinity,
//         url: "/api/download_document",
//         headers: {
//           authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
//           "Content-Type": "application/json",
//         },
//         data: data,
//       };

//       const response = await axios.request(config);
//       downloadFile(response.data, fileName);
//     } catch (error) {
//       console.log(error);
//     }
//   };




//   return (
//     <>
//       <div className="ProjectMain">

//         <Box>
//           {/* Hidden file input */}
//           <input
//             type="file"
//             label="Image"
//             name="myFile"
//             className="font-monospace"
//             accept=".jpeg, .png, .jpg, .pdf"
//             style={{ display: "none" }}
//             onChange={(e) => handleFileUpload(e)}
//           />
//           {/* Upload document button */}
//           <Button
//             variant="outlined"
//             className="button rounded-2 lowercase"
//             onClick={() => document.querySelector('input[type="file"]').click()}
//           >
//             Add New document&nbsp;
//             <AddIcon fontSize="small" />
//           </Button>
//           &nbsp;&nbsp;
//           {/* New document button */}
//           <Button
//             variant="contained"
//             className="button rounded-2 lowercase"
//             onClick={handleSubmit}
//             disabled={!fileSelected}
//           >
//             Upload document&nbsp;
//             <ArrowCircleUpIcon fontSize="small" />
//           </Button>

//           {selectedFileName && (
//             <p className="font-monospace pt-2 text-success">
//               Selected Document: {selectedFileName}
//             </p>
//           )}

//           {successMessage && (
//             <p className="font-monospace" style={{ color: "green" }}>
//               {successMessage}
//             </p>
//           )}
//         </Box>
//         <hr />

//         <div className="documents-section">

//           <div className="documents-header">
//             <h4>Uploaded Documents</h4>
//             <div className="total-documents">
//               <p>Total Number of Documents: {totalDocuments}</p>
//             </div>

//           </div>

//           <Button
//             variant="outlined"
//             className="button rounded-2 lowercase "
//             onClick={() => setShow((s) => !s)}
//           >
//             Show All Documents&nbsp;
//             <ViewListIcon fontSize="small" />
//           </Button>

//           <div className="documents-section">

//             {errorMessage && (
//               <p className="font-monospace" style={{ color: "red" }}>
//                 {errorMessage}
//               </p>
//             )}
//             <ul className="Doc_ul">
//               {!show
//                 ? imagesData.result?.slice(0, 8).map((docs, index) => {
//                   const fileName = docs.DOCUMENT_FILEDATA.originalname;
//                   const fileType = fileName.split(".").pop().toLowerCase();
//                   const isPDF = fileType === "pdf";
//                   const isJPG = fileType === "jpg" || fileType === "jpeg";

//                   return (
//                     <li className="Doc_li" key={index}>
//                       {/* <span className="delete-icon" onClick={() => handleDelete(docs.DOCUMENT_ID, fileName)} role="button" type="submit">
//                         <i className="fa fa-trash"></i>
//                       </span> */}
//                       <span className="Docfile-icon">
//                         {" "}
//                         {isPDF ? (
//                           <img src={pdf} />
//                         ) : isJPG ? (
//                           <img src={jpg} />
//                         ) : (
//                           <img src={png} />
//                         )}
//                       </span>
//                       <span className="Docfile-name font-monospace">
//                         {fileName.length > 15
//                           ? `${fileName.substring(0, 10)}...`
//                           : fileName}
//                       </span>
//                       <button
//                         className="doc_anchor font-monospace"
//                         onClick={() => handleDownload(docs.DOCUMENT_ID, fileName)}
//                       >
//                         Download
//                       </button>

//                     </li>
//                   );
//                 })
//                 : imagesData.result?.map((docs, index) => {
//                   const fileName = docs.DOCUMENT_FILEDATA.originalname;
//                   const fileType = fileName.split(".").pop().toLowerCase();
//                   const isPDF = fileType === "pdf";
//                   const isJPG = fileType === "jpg" || fileType === "jpeg";

//                   return (

//                     <li className="Doc_li" key={index}>

//                       {/* <span className="delete-icon" onClick={() => handleDelete(docs.DOCUMENT_ID, fileName)} role="button" type="submit">
//                         <i className="fa fa-trash"></i>
//                       </span> */}
//                       <span className="Docfile-icon">
//                         {" "}
//                         {isPDF ? (
//                           <img src={pdf} />
//                         ) : isJPG ? (
//                           <img src={jpg} />
//                         ) : (
//                           <img src={png} />
//                         )}
//                       </span>
//                       <span className="Docfile-name font-monospace">
//                         {fileName.length > 15
//                           ? `${fileName.substring(0, 10)}...`
//                           : fileName}
//                       </span>
//                       <button
//                         className="doc_anchor font-monospace"
//                         onClick={() => handleDownload(docs.DOCUMENT_ID, fileName)}
//                       >
//                         Download
//                       </button>
//                     </li>
//                   );
//                 })}
//             </ul>
//             <hr />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
