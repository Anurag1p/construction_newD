// import React, { useState, useEffect, useContext } from "react";
// import Box from "@mui/material/Box";
// import axios from "axios";
// import { DataGrid } from "@mui/x-data-grid";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { Button, Skeleton, Paper } from "@mui/material";
// import CreateSubcontract from "./CreateSubcontract";
// import { styled } from "@mui/material/styles";
// import { MyContext } from "../context/Mycontext";
// import EditSubcontract from "./EditSubContract";
// import Sidebar from "../components/Sidebar";
// import { useParams } from "react-router-dom";


// const SubContract = (props) => {
//   const {COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME } = useParams();
//   const [open, setOpen] = React.useState(false);
//   const [index, setIndex] = useState(1);
//   const [subcontractData, setSubContractData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [Edit, setEdit] = useState(false);
//   const [openNav, setOpenNav] = useState(false);
//   const [updatedata, setUpdateData] = useState(false);

//   // modal
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const { alldata, setText } = useContext(MyContext);
//   const { projectcreatedata } = useContext(MyContext);
  
//   const [data, setData] = useState({
//     row: {
//       SUBCONTRACTOR_PARENT_ID: "",
//       SUBCONTRACTOR_PARENT_USERNAME: "",
//       SUBCONTRACTOR_MEMBER_PARENT_ID: "",
//       SUBCONTRACTOR_MEMBER_PARENT_USERNAME: "",
//       SUBCONTRACTOR_ROLE: "",
//       SUBCONTRACTOR_NAME: "",
//       SUBCONTRACTOR_PHONE: "",
//       SUBCONTRACTOR_USERNAME: "",
//       SUBCONTRACTOR_START_DATE: "",
//       SUBCONTRACTOR_END_DATE: "",
//       SUBCONTRACTOR_SUPERVISOR: "",
//       SUBCONTRACTOR_COUNTRY: "",
//       SUBCONTRACTOR_STATE: "",
//       SUBCONTRACTOR_ADD: "",
//       SUBCONTRACTOR_CITY: "",
//     },
//   });


//   //update data

// const AllSubcontractor = props.SubContractorData;
 
//   const headers = {
//     "Content-Type": "application/json",
//     authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
//   };

//   const fetchsubcontracts = async (e) => {
//     try {
//       const response = await axios.put(
//         "/api/get_subcontractor",
//         {
//           SUBCONTRACTOR_PARENT_ID: COMPANY_ID,
//           SUBCONTRACTOR_PARENT_USERNAME: COMPANY_USERNAME,
//           SUBCONTRACTOR_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
//           SUBCONTRACTOR_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
//         },
//         { headers }
//       );

//       const data = response.data;
//       setSubContractData(data?.result);
//       setIsLoading(false);


//     } catch (err) {
//       console.log("Something Went Wrong: =>", err);
//     }
//   };

//   useEffect(() => {
//     fetchsubcontracts();
//   }, [AllSubcontractor]);

//   const [editedSubcontract, setEditedSubcontract] = useState(null);

//   const handleEdit = (subcontract) => {
//     setEditedSubcontract(subcontract);
//     handleOpen();
//   };

//   const columns = [
//     { field: "SUBCONTRACTOR_ID", headerName: "ID", width: 90 },
//     {
//       field: "SUBCONTRACTOR_USERNAME",
//       headerName: "USername",
//       width: 150,
//     },
//     {
//       field: "SUBCONTRACTOR_NAME",
//       headerName: "Name",
//       width: 150,
//     },
//     {
//       field: "SUBCONTRACTOR_PHONE",
//       headerName: "Phone",
//       width: 150,
//     },
//     {
//       field: "SUBCONTRACTOR_START_DATE",
//       headerName: "Start Date",
//       width: 150,
//     },
//     {
//       field: "SUBCONTRACTOR_END_DATE",
//       headerName: "End Date",
//       type: "number",
//       width: 100,
//     },

//     {
//       field: "SUBCONTRACTOR_SUPERVISOR",
//       headerName: "Supervisor",
//       width: 200,
//     },

//     {
//       field: "action",
//       headerName: "Detail",
//       width: 120,
//       renderCell: (cellValues) => {
//         return (
//           <Button
//             variant="contained"
//             className="view-btn primary btn btn-success"
//             style={{ padding: "2px 2px" }}
//             onClick={(event) => {
//               handleClick(cellValues);
//             }}
//           >
//             view
//           </Button>
//         );
//       },
//     },
//     {
//       field: "edit",
//       headerName: "Edit",
//       width: 120,
//       renderCell: (cellValues) => {
//         return (
//           <Button
//           // onClick={(event) => {
//           //   handleEdit(cellValues);
//           // }}
//           >
//             <EditSubcontract editsubcontract={cellValues} refetch={fetchsubcontracts} />
//           </Button>
//         );
//       },
//     },

//   ];

//   const rows = subcontractData;

//   const handleClick = (event) => {
//     setData(event);
//     handleOpen();
//   };

//   const filterData = data?.row;

//   const MyScreen = styled(Paper)((props) => ({
//     height: "calc(100vh - 32px)",
//     padding: 0,
//     paddingBottom: "0",
//     overflow: "auto",
//     borderRadius: 0,
//     Border: 0,
//     display: props.screenIndex ? "block" : "none",
//   }));

//   const Animations = () => {
//     return (
//       <Box sx={{ width: "100%" }}>
//         <Skeleton animation="pulse" height={60} />
//         <Skeleton animation="pulse" height={50} />
//         <Skeleton animation="pulse" height={50} />
//         <Skeleton animation="pulse" height={50} />
//         <Skeleton animation="pulse" height={50} />
//         <Skeleton animation="pulse" height={50} />
//         <Skeleton animation="pulse" height={50} />
//         <Skeleton animation="pulse" height={50} />
//       </Box>
//     );
//   };

//   return (
//     <>
//       <Sidebar
//         COMPANY_ID={COMPANY_ID}
//         COMPANY_USERNAME={COMPANY_USERNAME}
//         COMPANY_PARENT_ID={COMPANY_PARENT_ID}
//         COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
//         active={6}
//         toggle={openNav}
//       />
//       <Box className="box" style={{ background: "#277099" }}>
//         <CreateSubcontract
//           COMPANY_ID={COMPANY_ID}
//           COMPANY_USERNAME={COMPANY_USERNAME}
//           COMPANY_PARENT_ID={COMPANY_PARENT_ID}
//           COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
//           refetch={fetchsubcontracts}
//           name={"Contract"}
//           SubContractorData={subcontractData}
//         />

//         <MyScreen sx={{ display: "block", padding: 3 }}>
//           <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
//             {isLoading ? (
//               <Animations />
//             ) : (
//               <DataGrid
//                 sx={{ border: "none" }}
//                 rows={rows}
//                 columns={columns}
//                 getRowId={(row) => row.SUBCONTRACTOR_ID}
//                 initialState={{
//                   pagination: {
//                     paginationModel: {
//                       pageSize: 20,
//                     },
//                   },
//                 }}
//                 density="compact"
//                 pageSizeOptions={[5]}
//                 // checkboxSelection
//                 disableRowSelectionOnClick
//               />
//             )}
//           </Box>
//         </MyScreen>
//       </Box>

//       <Box
//         style={{
//           display: open ? "block" : "none",
//         }}
//         className="box position-absolute overflow-auto"
//       >
//         <div
//           className="container-fluid pb-0 g-0"
//           style={{ background: "#277099" }}
//         >
//           <Button
//             onClick={handleClose}
//             variant="contained"
//             className="btn rounded-0"
//             size="small"

//           >
//             <ArrowBackIcon style={{ fontSize: "20px" }} />
//           </Button>
//           <Button
//             onClick={(e) => setIndex(1)}
//             variant={index === 1 ? "outlined" : "outlined"}
//             className={index === 1 ? "btn button border-bottom-0 bg-white" : "btn rounded-0 border-bottom-0  rounded-0 text-light"}
//             size="small"
//           >
//             Detail
//           </Button>

//           <Button
//             onClick={(e) => setIndex(2)}
//             variant={index === 2 ? "outlined" : "outlined"}
//             className={index === 2 ? "btn button border-bottom-0 bg-white" : "btn rounded-0 border-0  rounded-0 text-light"}
//             size="small"
//           >
//             Documents
//           </Button>

//           {!Edit ? (
//             <Button
//               onClick={(e) => setEdit(true)}
//               variant={"contained"}
//               className="btn rounded-0 border-0"
//               size="small"
//               sx={{ position: "absolute", right: "0" }}
//             >
//               Edit
//             </Button>
//           ) : (
//             <Button
//               onClick={(e) => setEdit(false)}
//               variant={"contained"}
//               className="btn rounded-0 border-0"
//               size="small"
//               sx={{ position: "absolute", right: "0" }}
//             >
//               Save
//             </Button>
//           )}

//           <Button
//             onClick={(e) => setIndex(3)}
//             variant={index === 3 ? "outlined" : "outlined"}
//             className={index === 3 ? "btn button border-bottom-0 bg-white" : "btn rounded-0 border-0  rounded-0 text-light"}
//             size="small"
//           >
//             Payment
//           </Button>

//         </div>

//         {index === 1 ? (
//           <div className="box-tab">
//             <div className="container-fluid p-4">
//               <div className="row">
//                 <div className="col-4">
//                   <b>Project Name</b>
//                   <p className="bg-light text-dark p-2 rounded-2">
//                     {filterData.SUBCONTRACTOR_NAME}
//                   </p>
//                 </div>
//                 <div className="col-4">
//                   <b>Phone</b>
//                   <p className="bg-light text-dark p-2 rounded-2">
//                     {filterData.SUBCONTRACTOR_PHONE}
//                   </p>
//                 </div>
//                 <div className="col-4">
//                   <b>Subcontract Username</b>
//                   <p className="bg-light text-dark p-2 rounded-2">
//                     {filterData.SUBCONTRACTOR_USERNAME}
//                   </p>
//                 </div>
//                 <div className="col-4">
//                   <b>Subcontract Supervisor</b>
//                   <p className="bg-light text-dark p-2 rounded-2">
//                     {filterData.SUBCONTRACTOR_SUPERVISOR}
//                   </p>
//                 </div>
//                 {/* <div className="col-4">
//                   <b>Employement Type</b>
//                   <p className="bg-light text-dark p-2 rounded-2">
//                     {filterData.SUBCONTRACTOR_EMROLMNT_TYPE}
//                   </p>
//                 </div> */}
//                 <div className="col-4">
//                   <b>Location</b>
//                   <p className="bg-light text-dark p-2 rounded-2">
//                     {filterData.SUBCONTRACTOR_ADD}
//                   </p>
//                 </div>
//               </div>

//               <hr />

//               <div className="row">
//                 <div className="col">
//                   <b>Project Role</b>
//                   <p className="bg-light text-dark p-2 rounded-2">
//                     {filterData.SUBCONTRACTOR_ROLE
//                       ? filterData.SUBCONTRACTOR_ROLE
//                       : "not mentioned !"}
//                   </p>
//                 </div>
//                 <div className="col">
//                   <b>Project Status</b>
//                   <p className="bg-success text-dark p-2 rounded-2">
//                     In Execution
//                   </p>
//                 </div>
//                 <div className="col">
//                   <b>Project Start</b>
//                   <p className="bg-light text-dark p-2 rounded-2">
//                     {filterData.SUBCONTRACTOR_START_DATE}
//                   </p>
//                 </div>
//                 <div className="col">
//                   <b>Project End</b>
//                   {Edit ? (
//                     <input
//                       type="date"
//                       value={filterData.SUBCONTRACTOR_END_DATE}
//                       className="form-control form-control-2"
//                     />
//                   ) : (
//                     <p className="bg-light text-dark p-2 rounded-2">
//                       {filterData.SUBCONTRACTOR_END_DATE}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-4">
//                   <b>Project Progress</b>
//                   <div className="p-2 rounded-3 bg-light">
//                     <div
//                       className="progress-bar"
//                       style={{
//                         background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),conic-gradient(hotpink ${filterData.SUBCONTRACTOR_PROGRESS}%, pink 0)`,
//                       }}
//                     >
//                       <div className="counter">
//                         {filterData.SUBCONTRACTOR_PROGRESS}%
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <hr />
//               {/* Assigining project to the subcontractor  */}
//               {/*              
//               <div className="row">
//                 <div className="col-4">
//                   <b>Assigned Employees to this project</b>
//                   <div className="p-2 rounded-3 bg-light">
//                   <ul>
//                  {filterData.SUBCONTRACTOR_ASSIGN?.map((assignproject,key) => {
//                       return(
//                        <>
//                        <b>Employee ID</b> <span>{assignproject.EMPLOYEE_ID}</span>
//                        <br />
//                        <b>Company Username </b> <span> {assignproject.EMPLOYEE_PARENT_USERNAME}</span> <br />
//                        <b>Admin Username </b> <span> {assignproject.EMPLOYEE_MEMBER_PARENT_USERNAME}</span> <br />
//                        <b>Company ID </b> <span> {assignproject.EMPLOYEE_PARENT_ID}</span> <br />
//                        <b>Admin ID </b> <span> {assignproject.EMPLOYEE_MEMBER_PARENT_ID}</span> 
//                        </>
                    
//                       ) 
                    
//                  })}
//                    </ul>
//                   </div>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         ) : index === 3 ? (
//           <div className="box-tab">
//             <div className="p-4 container-fluid">
//               <div className="row">
//                 <div className="col-9">
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th scope="col">Material</th>
//                         <th scope="col">Quantity</th>
//                         <th scope="col">Amount</th>
//                         <th scope="col">Method</th>
//                         <th scope="col">Transaction ID</th>
//                         <th scope="col">Status</th>
//                         <th scope="col">Date</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>Tiles</td>
//                         <td>10</td>
//                         <td>20 USD</td>
//                         <td>Cash</td>
//                         <td>RG384054859</td>
//                         <td>
//                           <b className="bg-success text-white px-2 rounded-2">
//                             Paid
//                           </b>
//                         </td>
//                         <td>12-10-2020</td>
//                       </tr>
//                       <tr>
//                         <td>Cement</td>
//                         <td>20</td>
//                         <td>20 USD</td>
//                         <td>UPI</td>
//                         <td>TY485060</td>
//                         <td>
//                           <b className="bg-warning text-white px-2 rounded-2">
//                             Panding
//                           </b>
//                         </td>
//                         <td>12-10-2020</td>
//                       </tr>
//                       <tr>
//                         <td>Concrete</td>
//                         <td>60</td>
//                         <td>20 USD</td>
//                         <td>Stripe</td>
//                         <td>PO6970845</td>
//                         <td>
//                           <b className="bg-success text-white px-2 rounded-2">
//                             Paid
//                           </b>
//                         </td>
//                         <td>12-10-2020</td>
//                       </tr>
//                       <tr>
//                         <td>Bricks</td>
//                         <td>120</td>
//                         <td>the Bird</td>
//                         <td>Visa</td>
//                         <td>PO697084599</td>
//                         <td>
//                           <b className="bg-danger text-white px-2 rounded-2">
//                             Failed
//                           </b>
//                         </td>
//                         <td>12-10-2020</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="col-3 px-4">
//                   <div className="mb-5 ">
//                     <button className="btn btn-primary float-right rounded-0">
//                       <i className="fa fa-print"></i> Print Invoice
//                     </button>
//                   </div>
//                   <div className="search-container mb-5">
//                     <input type="text" placeholder="Search.." name="search" />
//                     <button type="submit">
//                       <i className="fa fa-search"></i>
//                     </button>
//                   </div>

//                   <div>
//                     <b>Time Period</b>
//                   </div>
//                   <div>
//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="flexRadioDefault"
//                         id="flexRadioDefault1"
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexRadioDefault1"
//                       >
//                         All time
//                       </label>
//                     </div>
//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="flexRadioDefault"
//                         id="flexRadioDefault2"
//                         checked
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexRadioDefault2"
//                       >
//                         Today
//                       </label>
//                     </div>

//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="flexRadioDefault"
//                         id="flexRadioDefault2"
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexRadioDefault2"
//                       >
//                         This Week
//                       </label>
//                     </div>

//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="flexRadioDefault"
//                         id="flexRadioDefault2"
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexRadioDefault2"
//                       >
//                         This month
//                       </label>
//                     </div>

//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="flexRadioDefault"
//                         id="flexRadioDefault2"
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexRadioDefault2"
//                       >
//                         Custom
//                       </label>
//                     </div>
//                   </div>
//                   <b>Status</b>
//                   <div>
//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         value=""
//                         id="flexCheckIndeterminate"
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexCheckIndeterminate"
//                       >
//                         Paid
//                       </label>
//                     </div>

//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         value=""
//                         id="flexCheckIndeterminate"
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexCheckIndeterminate"
//                       >
//                         Pending
//                       </label>
//                     </div>

//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         value=""
//                         id="flexCheckIndeterminate"
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexCheckIndeterminate"
//                       >
//                         Failed
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : index === 2 ? (
//           <div className="box-tab">
//             <div className="p-4 container-fluid">
//               <div className="row">
//                 <div className="col-9">
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th scope="col">Material</th>
//                         <th scope="col">Quantity</th>
//                         <th scope="col">Amount</th>
//                         <th scope="col">Method</th>
//                         <th scope="col">Transaction ID</th>
//                         <th scope="col">Status</th>
//                         <th scope="col">Date</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>Tiles</td>
//                         <td>10</td>
//                         <td>20 USD</td>
//                         <td>Cash</td>
//                         <td>RG384054859</td>
//                         <td>
//                           <b className="bg-success text-white px-2 rounded-2">
//                             Paid
//                           </b>
//                         </td>
//                         <td>12-10-2020</td>
//                       </tr>
//                       <tr>
//                         <td>Cement</td>
//                         <td>20</td>
//                         <td>20 USD</td>
//                         <td>UPI</td>
//                         <td>TY485060</td>
//                         <td>
//                           <b className="bg-warning text-white px-2 rounded-2">
//                             Panding
//                           </b>
//                         </td>
//                         <td>12-10-2020</td>
//                       </tr>
//                       <tr>
//                         <td>Concrete</td>
//                         <td>60</td>
//                         <td>20 USD</td>
//                         <td>Stripe</td>
//                         <td>PO6970845</td>
//                         <td>
//                           <b className="bg-success text-white px-2 rounded-2">
//                             Paid
//                           </b>
//                         </td>
//                         <td>12-10-2020</td>
//                       </tr>
//                       <tr>
//                         <td>Bricks</td>
//                         <td>120</td>
//                         <td>the Bird</td>
//                         <td>Visa</td>
//                         <td>PO697084599</td>
//                         <td>
//                           <b className="bg-danger text-white px-2 rounded-2">
//                             Failed
//                           </b>
//                         </td>
//                         <td>12-10-2020</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="col-3 px-4">
//                   <div className="mb-5 ">
//                     <button className="btn btn-primary float-right rounded-0">
//                       <i className="fa fa-print"></i> Print Invoice
//                     </button>
//                   </div>
//                   <div className="search-container mb-5">
//                     <input type="text" placeholder="Search.." name="search" />
//                     <button type="submit">
//                       <i className="fa fa-search"></i>
//                     </button>
//                   </div>

//                   <div>
//                     <b>Time Period</b>
//                   </div>
//                   <div>
//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="flexRadioDefault"
//                         id="flexRadioDefault1"
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexRadioDefault1"
//                       >
//                         All time
//                       </label>
//                     </div>
//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="flexRadioDefault"
//                         id="flexRadioDefault2"
//                         checked
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexRadioDefault2"
//                       >
//                         Today
//                       </label>
//                     </div>

//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="flexRadioDefault"
//                         id="flexRadioDefault2"
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexRadioDefault2"
//                       >
//                         This Week
//                       </label>
//                     </div>

//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="flexRadioDefault"
//                         id="flexRadioDefault2"
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexRadioDefault2"
//                       >
//                         This month
//                       </label>
//                     </div>

//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="flexRadioDefault"
//                         id="flexRadioDefault2"
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexRadioDefault2"
//                       >
//                         Custom
//                       </label>
//                     </div>
//                   </div>
//                   <b>Status</b>
//                   <div>
//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         value=""
//                         id="flexCheckIndeterminate"
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexCheckIndeterminate"
//                       >
//                         Paid
//                       </label>
//                     </div>

//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         value=""
//                         id="flexCheckIndeterminate"
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexCheckIndeterminate"
//                       >
//                         Panding
//                       </label>
//                     </div>

//                     <div className="form-check py-1">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         value=""
//                         id="flexCheckIndeterminate"
//                       />
//                       <label
//                         className="form-check-label"
//                         for="flexCheckIndeterminate"
//                       >
//                         Failed
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           ""
//         )}
//       </Box>
//     </>
//   );
// };

// export default SubContract;
