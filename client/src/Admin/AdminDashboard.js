/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyCreate from "./CompanyCreate";
import CompanyEdit from "./CompanyEdit";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase"
import { fetchSignInMethodsForEmail, signOut } from "firebase/auth";
import InputControl from "../components/InputControl";
import { createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { getAllCompany } from "../redux/slice/AllCompanySlice";
const itemsPerPage = 8;

const AdminDashboard = (props) => {
  // const { state } = useLocation()
  const { state } = useLocation()
  // console.log(props.adminData, "props.adminData")
  const navigate = useNavigate();

  //data from redux...
  const allcompanyData = useSelector(state => state?.allCompany?.company)

  const tableRows = state;
  console.log(tableRows, "tableRows")
  // const [RowsData, setRows] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayType, setDisplayType] = useState(true);
  const [detail, setDetail] = useState();


  function reverseArray(arr) {
    let reversed = [];
    for (let i = arr?.length - 1; i >= 0; i--) {
      reversed.push(arr[i]);
    }
    return reversed;
  }
  let Rows = reverseArray(allcompanyData);
  
//function for logout
  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/logout');
      console.log("logout", response)
      if (response?.status === 200) {
        navigate("/root");
      }
    } catch (error) {
      // Handle network or other errors
    }
  };


  const displayData = [];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, Rows?.length);

  for (let i = startIndex; i < endIndex; i++) {
    displayData.push(Rows[i]);
  }

  const maxPage = Math.ceil(Rows?.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const totalPages = Math.ceil(Rows?.length / itemsPerPage);

    const maxButtons = 3; // Maximum of 3 page buttons

    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages, startPage + maxButtons - 1);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={
            currentPage === i
              ? "active btn btn-secondary btn-sm"
              : "btn btn-secondary btn-sm"
          }
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  const Details = ({ data }) => {
    const [edit, setEdit] = useState(true)

    const [values, setValues] = useState({
      name: `${data.COMPANY_ID}&&${data.COMPANY_USERNAME}&&${tableRows?.ADMIN_ID}&&${tableRows?.ADMIN_USERNAME}&&company`,
      email: data.COMPANY_USERNAME,
      pass: data.COMPANY_PHONE,
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [passwordMsg, setpasswordMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [userExist, setUserExist] = useState(false)


    // check if user exists
    const checkUserExists = () => {

      fetchSignInMethodsForEmail(auth, values.email)
        .then((signInMethods) => {
          if (signInMethods.length > 0) {
            setUserExist(true)
          } else {
            console.log('User does not exist');

            setUserExist(false)
          }
        })
        .catch((error) => {
          // Handle error
          console.error('Error checking user existence:', error);
        });
    };


    // create user
    const createUser = () => {

      if (!values.name || !values.email || !values.pass) {
        setErrorMsg("Fill all fields");
        return;
      }
      setErrorMsg("");
      setSubmitButtonDisabled(true);
      createUserWithEmailAndPassword(auth, values.email, values.pass)
        .then(async (res) => {
          setSubmitButtonDisabled(false);
          const user = res.user;
          await updateProfile(user, {
            displayName: values.name,
          });
          setpasswordMsg("user created successfully");
        })
        .catch((err) => {
          setSubmitButtonDisabled(false);
        });

    }

    //send reset link
    const Resetlink = () => {
      sendPasswordResetEmail(auth, values.email)
        .then(() => {
          // successMsg('Password reset email sent successfully')
          setpasswordMsg("Password reset link is send to company");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setErrorMsg(error.message)
        });
    }


    const handleSubmission = () => {

      checkUserExists()

      if (!userExist) {
        createUser();
        setTimeout(() => {
          Resetlink();
        }, 1000)

      } else if (userExist) {
        Resetlink();
      } else {
        setpasswordMsg("something went wrong")
      }
    };

    // console.log(data, "datainside")

    return (
      <>
       
        <div>
          <center>
            {errorMsg && (
              <p className=" text-danger fw-light mb-0 fs-6">{errorMsg}</p>
            )}
            {passwordMsg && (
              <p className=" text-success fw-light mb-0 fs-6">{passwordMsg}</p>
            )}
          </center>
        </div>

        <center> <h4 style={{ fontFamily: "monospace", border: "10px solid grey", background: "grey", color: "white" }}>{data.COMPANY_NAME}</h4></center>
        <table className="table">
          <tbody >
            <tr>
              <td><b>Company Id:</b></td>
              <td>{data.COMPANY_ID}</td>
            </tr>
            <tr>
              <td><b>Company Address:</b></td>
              <td>{data.COMPANY_ADD2 ? data.COMPANY_ADD2 : "Not Available"} | {data.COMPANY_STATE ? data.COMPANY_STATE : "Not Available"}</td>
            </tr>
            <tr>
              <td><b>Phone :</b></td>
              <td>{data.COMPANY_PHONE}</td>
            </tr>
            <tr>
              <td><b>Email :</b></td>
              <td>{data.COMPANY_USERNAME}</td>
            </tr>

            <tr>
              <td><b>Password :</b></td>
              <td className="d-flex" style={{ gap: 4 }}>
                <button className="btn btn-sm btn-primary" onClick={handleSubmission} disabled={submitButtonDisabled}>
                  Send Password Reset Link
                </button>
              </td>
            </tr>

            {/* <tr>
              <td><b>Subscription :</b></td>
              {edit ? <td>Basic</td> :
                <>
                  <td className="d-flex" style={{ gap: 4 }}>

                    <input type="radio" id="Basic" name="fav_language" value="Basic" />
                    <label for="Basic">Basic</label><br />
                    <input type="radio" id="Silver" name="fav_language" value="Silver" />
                    <label for="Silver">Silver</label><br />
                    <input type="radio" id="gold" name="fav_language" value="Gold" />
                    <label for="gold">Gold</label>
                  </td>
                </>

              }


            </tr> */}

          </tbody >
        </table >
      </>

    )
  }

  const HandleDetail = (post) => {
    // return <Detail data={post} />
    return setDetail(<Details data={post} />)
  }


  // trying to execute the expiry data 

  // const HandleMail = async (post) => {
  //   let data = JSON.stringify({
  //     "DOCUMENT_ADMIN_USERNAME": post?.COMPANY_USERNAME,
  //     "DOCUMENT_REF_ID": post?.COMPANY_ID,
  //     // "DOCUMENT_EXPIRY_DATE": 8976
  //   });
  //   try {
  //     const mailResponse = await axios.put('/api/send-com-notification', data);
  //     console.log("mailData", mailResponse);

  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  // console.log(detail, "detail")

  return (
    <>
      <div className="container-fluid g-0">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark position-sticky top-0"
          style={{ marginBottom: 0 }}
        >
          <div className="container justify-content-between">
            <a className="navbar-brand">
              <span style={{ border: "2px solid tan", borderRadius: "50%", padding: " 2px 5px" }}>
                <FontAwesomeIcon icon={faUser} style={{ fontSize: "1.3rem", color: "tan" }} />
              </span>
              <span style={{ margin: " 0 10px" }}>{tableRows?.ADMIN_USERNAME} <small style={{ fontSize: "10px", color: "tan", border: "1px solid tan", borderRadius: "50%", padding: "3px" }}> Admin</small></span>
            </a>

            <button
              className="btn  my-2 my-sm-0 btn-sm"
              type="submit"
              onClick={handleLogout}
              style={{ color: "tan", border: "1px solid tan" }}
            >
              Logout
            </button>


          </div>
        </nav>

        <nav
          className="navbar navbar-expand-lg navbar-light bg-light"
          style={{ height: "40px" }}
        >
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="bg-white text-dark nav-link ">My Companies</a>
              </div>
            </div>
          </div>
        </nav>


        <div className="container" style={{ display: "flex", width: "100%", alignItems: "center", margin: "0 auto", justifyContent: "center", height: "80vh" }}>
          <div className="row w-100" style={{ height: "70vh" }}>
            <div className="col-xl-6 overflow-auto pt-2 border">
              <div className="justify-between">
                <div
                  style={{ display: "flex", justifyContent: "space-between", padding: "10px 5px" }}
                >
                  <CompanyCreate
                    ADMIN_ID={tableRows?.ADMIN_ID}
                    ADMIN_USERNAME={tableRows?.ADMIN_USERNAME}
                    Update={getAllCompany}
                  />
                </div>
              </div>
              {Rows?.length > 0 ? (
                <>
                  <div className="row">
                    <div className="col-xl-12 overflow-auto pt-2">
                      <div className="justify-between">

                        <div style={{ gap: 5, display: "flex" }}>
                          <button
                            onClick={() => handleClick(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                            className="btn btn-primary btn-sm"
                          >
                            Previous
                          </button>
                          {renderPageButtons()}
                          <button
                            onClick={() =>
                              handleClick(Math.min(currentPage + 1, maxPage))
                            }
                            disabled={currentPage === maxPage}
                            className="btn btn-primary btn-sm"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">

                    <div className="col-xl-12 overflow-auto pt-2">
                      {displayType ? (
                        <table className="table-sm  table-hover table border w-100 table-striped table-sm pt-4 table-fixed display">
                          {displayData?.length > 0 ? <thead>
                            <tr style={{ width: "100%" }}>
                              <th style={{ fontSize: "13px" }}>S.no.</th>
                              <th style={{ fontSize: "13px" }}>Name</th>
                              <th style={{ fontSize: "13px" }}>ID</th>
                              <th style={{ fontSize: "13px" }}>Username</th>
                              <th style={{ fontSize: "13px" }}>Edit</th>
                              <th style={{ fontSize: "13px" }}>Detail</th>
                              {/* <th style={{ fontSize: "13px" }}>Mail</th> */}
                            </tr>
                          </thead> : "loading..."}

                          <tbody>
                            {displayData.map((post, index) =>
                            (
                              <tr key={post.COMPANY_ID} className="border" style={{ cursor: "pointer" }} onClick={(e) => HandleDetail(post)}>
                                <td className="border">{startIndex + index + 1}</td>
                                <td className="border">{post.COMPANY_NAME}</td>
                                <td className="border">{post.COMPANY_ID}</td>
                                <td className="border">{post.COMPANY_USERNAME}</td>
                                <td className="border">
                                  <CompanyEdit
                                    companyEDit={post}
                                    reFetchfun={getAllCompany}
                                    reFetchDetail={HandleDetail}
                                  />
                                </td>
                                <td>
                                  <Button variant={"contained"} size="small" onClick={(e) => HandleDetail(post)}><InfoIcon sx={{ color: "#fff" }} /></Button>
                                </td>
                                {/* <td>
                                  <Button variant={"contained"} size="small" onClick={(e) => HandleMail(post)}><EmailIcon sx={{ color: "#fff" }} /></Button>
                                </td> */}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="row">
                          {displayData.map((post, index) => (
                            // <div className="row">
                            <div className="col-xl-2 col-sm-6">
                              <div
                                className="card my-1"
                                style={{
                                  width: "100%",
                                  height: "150px"
                                }}
                                key={index}
                              >
                                <div

                                  className="card-body postion-relative"
                                  style={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                  }}
                                >
                                  <h6 className="card-title" style={{ fontSize: "10px" }}>
                                    {post.COMPANY_NAME} - {post.COMPANY_ID}
                                  </h6>

                                  <div className="w-100">{post.COMPANY_EMAIL} </div>
                                  <div
                                    className="position-absolute d-flex"
                                    style={{
                                      right: "10px",
                                      bottom: "10px",
                                      overflow: "hidden",
                                      gap: 2
                                    }}
                                  >
                                    <CompanyEdit
                                     companyEDit={post}
                                     reFetchfun={getAllCompany}
                                     reFetchDetail={HandleDetail}
                                    />
                                    <div className="buttons" onClick={(e) => HandleDetail(post)}>
                                      <input type="radio" id="a25" name="check-substitution-2" />
                                      <label className="btn btn-default btn-sm" for="a25">Show</label>
                                    </div>
                                    <div className="buttons">
                                      <button className="btn btn-default btn-sm" for="a25">{UserExists(post.COMPANY_EMAIL)}</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            // </div>
                          ))}
                        </div>
                      )}
                      <div className="mobile-display">
                        {displayData.map((post, index) => (
                          <div
                            className="card my-1"
                            style={{
                              width: "100%",
                              background: index % 2 === 0 ? "#f3f3f3" : "#fffff",
                            }}
                            key={index}
                          >
                            <div className="card-body ">
                              <h6 className="card-title">
                                {post.COMPANY_NAME} - {post.COMPANY_ID}
                              </h6>
                              <div className="d-flex space-between">
                                <div className="w-100">{post.COMPANY_EMAIL} </div>
                                <div className="d-flex" style={{ gap: 2 }}>
                                  <CompanyEdit
                                   companyEDit={post}
                                   reFetchfun={getAllCompany}
                                   reFetchDetail={HandleDetail}
                                  />
                                  {" "}
                                  <div className="buttons" onClick={(e) => HandleDetail(post)}>
                                    <input type="radio" id="a25" name="check-substitution-2" />
                                    <label className="btn btn-default btn-sm" for="a25">Show</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </>) : (
                <div className="container">No Companies Available At The Moment.</div>
              )}
            </div>

            <div className="col-xl-6 overflow-auto pt-2 border position-relative">
              {detail ? detail : <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}><i className="fa fa-sticky-note-o" aria-hidden="true"></i>{" "}Company Detail will show here, Please click over company list or show button</span>}
            </div>
          </div>


        </div>

      </div>
    </>
  );
};

export default AdminDashboard;
