import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import InputControl from "../components/InputControl";
import { auth } from "../firebase";

import styles from "../assests/css/Login.module.css";
import { Alert, Stack } from "@mui/material";

function Login(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showpassword, setShowpassword] = useState(true)


  // useEffect(()=>{
  //   setErrorMsg(props.message);
  // },[])

  const handleSubmission = () => {

    if (!values.email || !values.pass) {
      setErrorMsg("Please fill all fields");
      return;
    }
    setErrorMsg("");
    setLoading(true)
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        console.log("res", res.user.displayName);

        // res.user.displayName ? navigate("/company"):

        setSubmitButtonDisabled(false);
        setLoading(false)
        const data = res.user.displayName
        // navigate(`/employee` , {state : data});
        console.log(data, "data")
        const param = data?.split("&&")
        if (param[4] === "employee") {
          navigate(`/employee/home`);
          // navigate(`/employee/${param[1]}/details`, { state: data });
          // navigate(`/employee/${param[0]}/${param[1]}/${param[2]}/${param[3]}`, { state: data });
        } else {
          navigate("/");
          setErrorMsg("Employee: Error (auth/invalid-login-credentials).");
        }

      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
        setLoading(false)
      });
  };
  return (
    <>
      {/* <div className={styles.innerBox}> */}
      <h5 className={styles.heading}>Shalbro Constructions</h5>
      <h5 className="text-center">Login(Employee)</h5>

      <InputControl
        label="Email"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, email: event.target.value }))
        }
        placeholder="Enter email address"
      />

      <span style={{ position: "relative" }} className="mb-3">
        <InputControl
          label="Password"
          type={showpassword ? "password" : "text"}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />
        <span style={{ position: "absolute", right: "10px", top: "50%" }}>
          <i className={showpassword ? "fa fa-eye-slash" : "fa fa-eye"} onClick={() => setShowpassword(e => !e)}></i></span>

      </span>

      {errorMsg && (
        <>
          <Stack sx={{ width: '100%' }} spacing={2} pt={1}>
            <Alert severity="error">{errorMsg}</Alert>
          </Stack>
        </>

      )}

      {/* <br /> */}
      <div className={styles.footer}>
        {/* <b className={styles.error}>{errorMsg}</b> */}
        <button disabled={submitButtonDisabled} onClick={handleSubmission}>
          {loading ? "loading..." : "Login"}
        </button>
      </div>

      {/* </div> */}
    </>
  );
}

export default Login;
