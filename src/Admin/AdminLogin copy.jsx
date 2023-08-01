import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import InputControl from "../components/InputControl";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { auth } from "../firebase";
import styles from "../assests/css/Login.module.css";
import env from "react-dotenv";


function AdminLogin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ADMIN_USERNAME: "",
    ADMIN_PASSWORD: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmission = () => {
    if (!values.ADMIN_USERNAME || !values.ADMIN_PASSWORD) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    
    // setSubmitButtonDisabled(true);
    console.log("My IP", env.PORT);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${env.API_URL}/login`,
      headers: {
        authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
        "Content-Type": "application/json",
      },
      data: values,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data, "mylogin");
        // setSubmitButtonDisabled(false);
        const data = response.data
        if(data.operation === "successfull"){
        navigate("/admin",  { state: { data } });
        }
      })
      .catch((error) => {
        setErrorMsg("something Went Wrong");
      });
  };

  // console.log(errorMsg,"my")

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>
          Login<sup style={{ fontSize: "20px", color: "tomato" }}>Admin</sup>
        </h1>

        <InputControl
          label="Username"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              ADMIN_USERNAME: event.target.value,
            }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              ADMIN_PASSWORD: event.target.value,
            }))
          }
          placeholder="Enter Password"
        />

        <div className={styles.footer}>
          <center>
            <p className=" text-danger fw-light mb-0">{errorMsg}</p>
            
          </center>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;