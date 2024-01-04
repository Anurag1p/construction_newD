// import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AddIcon from "@mui/icons-material/Add";
// import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
// import {
//   Button,
// } from "@mui/material";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "60%",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 4,
// };

// export default function DocumentModal(props) {
//   const [postImage, setPostImage] = useState({
//     myFile: "",
//     DOCUMENT_FILEDATA: ""
//   });
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [selectedFileName, setSelectedFileName] = useState("");
//   const [fileSelected, setFileSelected] = useState(false);
//   const DocData = props.empData;


//   const [backdrop, setBackdrop] = useState(false);

//   const headers = {
//     "Content-Type": "multipart/form-data",
//     authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setBackdrop(true);
//     const response = await axios
//       .post("/api/create_document", postImage.myFile, {
//         headers,
//       })
//       .then((response) => {
//         setBackdrop(false);
//         // getalldocument();
//         toast.success("Document uploaded successfully!", {
//           position: toast.POSITION.TOP_CENTER,
//           autoClose: 1000,
//         });
//         setSelectedFileName("");
//         console.log("first",response)
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   // Function to select the documents to upload 
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFileSelected(true);
//       const formdata = new FormData();
//       formdata.append("file", file);
//       formdata.append("DOCUMENT_REF_ID", DocData.COMPANY_ID);
//       formdata.append("DOCUMENT_ADMIN_USERNAME", DocData.COMPANY_PARENT_USERNAME);
//       setPostImage({ myFile: formdata });
//       setSelectedFileName(file.name);
//     } else {
//       setFileSelected(false);
//     }
//   };




//   return (
//     <>

//       <Button
//         onClick={handleOpen}
//         sx={{ color: "#277099" }}
//         className="btn rounded-0 border-0  rounded-0 text-light"
//         variant="contained"
//         size="small"
//       >
//         + Add New Document
//       </Button>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         className="modalWidth"
//       >
//         <Box sx={style}>
//           <div className="container">
//             <div className="row">
//               <div className="col-6 border border-gray">

//                 <label className="labelSelectFile" >Select File </label>


//                 <input
//                   type="file"
//                   label="Image"
//                   name="myFile"
//                   className="font-monospace fileinput col-6"
//                   accept=".jpeg, .png, .jpg, .pdf"
//                   style={{ display: "none" }}
//                   onChange={(e) => handleFileUpload(e)}
//                 />
//               </div>

//               <div className="col-6">
//                 <Button
//                   variant="outlined"
//                   // className="button rounded-2 lowercase"
//                   onClick={() => document.querySelector('input[type="file"]').click()}
//                 >
//                   Choose document&nbsp;
//                   <AddIcon fontSize="small" />
//                 </Button>
//                 &nbsp;&nbsp;


//                 {selectedFileName && (
//                   <p className="font-monospace pt-2 text-success">
//                     Selected Document: {selectedFileName}
//                   </p>
//                 )}

//               </div>
//             </div>
//             <div className="row mt-4">
//               <div className="col-6 border border-gray rounded">
//                 <label className="labelSelectFile"> Select Expiry Date</label>
//               </div>
//               <div className="col-6">
//                 <input
//                   type="date"
//                   // value={createProject.PROJECT_START_DATE}
//                   name="PROJECT_START_DATE"
//                   // onChange={handleCreate}
//                   className="inputDate "
//                 />
//               </div>
//             </div>
        
//             <div className="FormButtonAlign">
//               <button
//                 type="submit"
//                 className="btn btn-info text-white"
//                 onClick={handleSubmit}
//                 disabled={!fileSelected}
//                 style={{cursor:"pointer"}}
//               >
//                 Upload document<ArrowCircleUpIcon fontSize="small" />
//               </button>{" "}
//               <button
//                 onClick={handleClose}
//                 className="btn btn-danger text-white"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>

//         </Box>
//       </Modal>
//     </>
//   );
// }
