import React,{useEffect} from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Button, Container, Tooltip, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import country from "../Api/countriess.json";
import { ToastContainer, toast } from "react-toastify";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import companytype from "../jsonlist/typeOfCompany.json";

import SimpleBackdrop from "../components/Backdrop";

import {
  validatePhoneNumber,
} from "../components/Validation";
import { useDispatch } from "react-redux";
import { getAllCompany, setCompanyData } from "../redux/slice/AllCompanySlice";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  borderRadius: 2,
  overflow: "hidden",
};

export default function CompanyEdit(props) {
  const [open, setOpen] = React.useState(false);
  const companyData = props?.companyEDit;
  const [loader, setLoader] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [companyphoneError, setCompanyPhoneError] = useState("");
  const [companynameError, setCompanynameError] = useState("");

  const [edit_company, setEdit_company] = useState({
    COMPANY_ID: companyData.COMPANY_ID,
    COMPANY_PARENT_ID: companyData.COMPANY_PARENT_ID,
    COMPANY_PARENT_USERNAME: companyData.COMPANY_PARENT_USERNAME,
    COMPANY_NAME: companyData.COMPANY_NAME,
    COMPANY_PHONE: companyData.COMPANY_PHONE,
    COMPANY_ADD2: companyData.COMPANY_ADD2,
    COMPANY_STATE: companyData.COMPANY_STATE,
    COMPANY_CITY: companyData.COMPANY_CITY,
    COMPANY_COUNTRY: companyData.COMPANY_COUNTRY,
    COMPANY_SUBSCRIPTION: companyData.COMPANY_SUBSCRIPTION,
    COMPANY_STATUS: companyData.COMPANY_STATUS,
    COMPANY_ROLE: companyData.COMPANY_ROLE,
    COMPANY_USERNAME: companyData.COMPANY_USERNAME,

  });

  const [formErrors, setFormErrors] = useState({
    COMPANY_NAME: "",
    COMPANY_USERNAME: "",
    COMPANY_PHONE: "",
    COMPANY_COUNTRY: "",
    COMPANY_STATE: "",
    COMPANY_CITY: "",
    COMPANY_ADD2: "",
  });
  const dispatch = useDispatch();

  // ... rest of your code
  // const headers = {
  //   "Content-Type": "application/json",
  //   authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  // };

  const handleCreate = (e) => {
    const { name, value } = e.target;

    setEdit_company((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: value ? "" : "This field is required",
    }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Finding the states and cities of the individaul country
  const availableState = country?.find(
    (c) => c.name === edit_company.COMPANY_COUNTRY
  );

  const availableCities = availableState?.states?.find((s) => {
    return s.name === edit_company.COMPANY_STATE;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear previous validation errors
    setCompanynameError("");
    setCompanyPhoneError("")
    setEmailError("");
    setErrorMsg("");

    // Validate phone number, username, and email fields
    // const isValidUsername = edit_company.COMPANY_USERNAME !== "";
    const isValidCompanyname = edit_company.COMPANY_NAME !== "";
    const isValidPhone = validatePhoneNumber(edit_company.COMPANY_PHONE);
    const isValidEmail = edit_company.COMPANY_USERNAME !== "";


    if (!isValidCompanyname) {
      setCompanynameError("Name should not be empty");
      return;
    }

    if (!isValidPhone) {
      setCompanyPhoneError("Invalid phone number or feild should not be empty");
      return;
    }

    if (!isValidEmail) {
      setEmailError("Invalid email address or should not be empty");
      return;
    }
    const hasErrors = Object.values(formErrors).some((error) => error !== "");

    if (hasErrors) {
      toast.error("Please fill in all required fields", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    axios
      .put(
        "/api/update_company",
        {
          COMPANY_ID: companyData.COMPANY_ID,
          COMPANY_USERNAME: companyData.COMPANY_USERNAME,
          COMPANY_ADMIN_USERNAME: companyData.COMPANY_PARENT_USERNAME,
          COMPANY_DETAILS_FOR_UPDATE: { ...edit_company },
        },

      )
      .then((response) => {
        if (response.data.operation === "failed") {
          setErrorMsg(response.data.errorMsg);
        } else if (response.data.operation === "successfull") {
        dispatch(setCompanyData(response.data.result));
          toast.success("Fields are updated successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
          props.reFetchfun();
          props.reFetchDetail(edit_company)
          setOpen(false)
          props.companyEDit.update(true);

        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getAllCompany()
  }, [edit_company]);

  const StyledFab = styled(Fab)({
    position: "fixed",
    top: "80px",
    right: "80px",
  });


  console.log("edit company", edit_company)

  return (
    <>
      <Tooltip title="Edit Details">
        <button className="btn btn-success btn-sm">
          <EditNoteOutlinedIcon
            onClick={handleOpen}
            color="success"
            style={{ cursor: "pointer", fontSize: "18px", color: "#fff" }}
          />
        </button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container
          id="content"
          style={{ height: "100vh", position: "relative" }}
          maxWidth="xl"
        >
          <Box className="modal-content">
            <form className="p-4 overflow-auto">
              <h5>Edit company</h5>
              <div className="row">
                <div className="form-group py-2 col-xl-6">
                  <label>Company name</label>
                  <input
                    type="text"
                    className={`form-control form-control-2 rounded-0 ${companynameError ? "is-invalid" : ""
                      }`}
                    placeholder="Enter company name"
                    value={edit_company.COMPANY_NAME}
                    name="COMPANY_NAME"
                    onChange={handleCreate}
                    label=""
                  />
                  {companynameError && (
                    <div className="invalid-feedback">{companynameError}</div>
                  )}
                </div>
                <div className="form-group py-2 col-xl-6">
                  <label>Company Email</label>
                  <input
                    type="text"
                    className={`form-control form-control-2 rounded-0 ${usernameError ? "is-invalid" : ""
                      }`}
                    placeholder="Enter Company Email"
                    value={edit_company.COMPANY_USERNAME}
                    name="COMPANY_EMAIL"
                    onChange={handleCreate}
                    label="Company Email"
                    disabled
                  />
                </div>
              </div>
              <div className="row">
                {/* Phone Number */}
                <div className="form-group py-2 col-xl-6">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    className={`form-control form-control-2 rounded-0 ${companyphoneError ? "is-invalid" : ""
                      }`}
                    placeholder="Enter Number"
                    value={edit_company.COMPANY_PHONE}
                    name="COMPANY_PHONE"
                    onChange={handleCreate}
                    label="Phone Number"
                  />
                  {companyphoneError && (
                    <div className="invalid-feedback">{companyphoneError}</div>
                  )}

                </div>
              </div>
              <div className="row py-2">
                <div className="form-group col-xl-4">
                  <label>Company Type</label>
                  <select
                    className="form-control form-control-2 border  rounded-0"
                    name="COMPANY_ROLE"
                    value={edit_company.COMPANY_ROLE}
                    onChange={handleCreate}

                  >
                    <option selected>{edit_company.COMPANY_ROLE ? edit_company.COMPANY_ROLE : "--Choose--"}</option>

                    {companytype.map((e, key) => {
                      return (
                        <option value={e} key={key}>
                          {e}
                        </option>
                      );
                    })}
                  </select>
                </div>


                <div className="form-group col-xl-4">
                  <label>Subscription Type</label>
                  <select
                    className="form-control form-control-2 border rounded-0"
                    name="COMPANY_SUBSCRIPTION"
                    value={edit_company.COMPANY_SUBSCRIPTION}
                    onChange={handleCreate}
                  >
                    <option selected>--Select Subscription--</option>
                    <option selected>Monthly</option>
                    <option selected> Annual</option>
                  </select>
                </div>

                <div className="form-group col-xl-4">
                  <label>Company Status</label>
                  <select
                    className="form-control form-control-2 border rounded-0"
                    name="COMPANY_STATUS"
                    value={edit_company.COMPANY_STATUS}
                    onChange={handleCreate}
                  >
                    <option selected> {edit_company.COMPANY_STATUS ? edit_company.COMPANY_STATUS : "--Select Status--"}</option>
                    <option selected>Active</option>
                    <option selected> Inactive</option>
                  </select>
                </div>
              </div>



              <div className="row py-2">
                <div className="form-group col-xl-4">
                  <label>Country</label>
                  <select
                    className="form-control form-control-2 border  rounded-0"
                    name="COMPANY_COUNTRY"
                    value={edit_company.COMPANY_COUNTRY}
                    onChange={handleCreate}
                    required
                  >
                    <option>--Choose--</option>

                    {country.map((e, key) => {
                      return (
                        <option value={e.name} key={key} selected>
                          {e.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group col-xl-4">
                  <label>State</label>
                  <select
                    className="form-control form-control-2 border  rounded-0"
                    name="COMPANY_STATE"
                    value={edit_company.COMPANY_STATE}
                    onChange={handleCreate}
                  >
                    <option selected>--Choose States--</option>
                    {availableState?.states?.map((state, key) => {
                      return (
                        <option value={state.name} key={key}>
                          {state.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group col-xl-4">
                  <label>City</label>
                  <select
                    className="form-control form-control-2 border rounded-0"
                    name="COMPANY_CITY"
                    value={edit_company.COMPANY_CITY}
                    onChange={handleCreate}
                    required
                  >
                    <option selected>--Choose City--</option>
                    {availableCities?.cities?.map((e, key) => {
                      return (
                        <option value={e.name} key={key}>
                          {e.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group col-xl-12">
                <label>Address</label>
                <textarea
                  type="text"
                  className="form-control rounded-0"
                  placeholder="Apartment, studio, or floor"
                  name="COMPANY_ADD2"
                  value={edit_company.COMPANY_ADD2}
                  onChange={handleCreate}
                  required
                // rows="4"
                // cols="50"
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                className="btn text-white rounded-2 mt-2"
                onClick={handleSubmit}
              >
                Update
              </Button>{" "}
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}
                className="btn text-white rounded-2 mt-2"
              >
                Cancel
              </Button>
            </form>
          </Box>
        </Container>
      </Modal>
      <SimpleBackdrop open={loader} />
    </>
  );
}
