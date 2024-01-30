import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import country from "../../Api/countriess.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import env from "react-dotenv";

import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSubcontractor, getAllSubcontractor } from "../../redux/slice/SubContractorSlice";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};

export default function EditSubcontract(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Validation error states
    const [usernameError, setUsernameError] = useState("");
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const [editSubcontract, setEditsubcontract] = useState({
        SUBCONTRACTOR_PARENT_ID: '',
        SUBCONTRACTOR_PARENT_USERNAME: '',
        SUBCONTRACTOR_MEMBER_PARENT_ID: '',
        SUBCONTRACTOR_MEMBER_PARENT_USERNAME: '',
        SUBCONTRACTOR_USERNAME: "",
        SUBCONTRACTOR_NAME: "",
        SUBCONTRACTOR_PHONE: "",
        SUBCONTRACTOR_ROLE: "",
        SUBCONTRACTOR_START_DATE: "",
        SUBCONTRACTOR_END_DATE: "",
        SUBCONTRACTOR_SUPERVISOR: "",
        SUBCONTRACTOR_ADD: "",
        SUBCONTRACTOR_COUNTRY: "",
        SUBCONTRACTOR_STATE: "",
        SUBCONTRACTOR_CITY: "",
    });

    const editsubcontracts = props?.editsubcontract.row
    const dispatch = useDispatch();
    useEffect(() => {
        if (editsubcontracts) {
            setEditsubcontract((prevState) => ({
                ...prevState,
                SUBCONTRACTOR_PARENT_ID: editsubcontracts.COMPANY_ID,
                SUBCONTRACTOR_PARENT_USERNAME: editsubcontracts.COMPANY_USERNAME,
                SUBCONTRACTOR_MEMBER_PARENT_ID: editsubcontracts.COMPANY_PARENT_ID,
                SUBCONTRACTOR_MEMBER_PARENT_USERNAME: editsubcontracts.COMPANY_PARENT_USERNAME,
                SUBCONTRACTOR_PHONE: editsubcontracts.SUBCONTRACTOR_PHONE,
                SUBCONTRACTOR_USERNAME: editsubcontracts.SUBCONTRACTOR_USERNAME,
                SUBCONTRACTOR_NAME: editsubcontracts.SUBCONTRACTOR_NAME,
                SUBCONTRACTOR_ROLE: editsubcontracts.SUBCONTRACTOR_ROLE,
                SUBCONTRACTOR_START_DATE: editsubcontracts.SUBCONTRACTOR_START_DATE,
                SUBCONTRACTOR_END_DATE: editsubcontracts.SUBCONTRACTOR_END_DATE,
                SUBCONTRACTOR_SUPERVISOR: editsubcontracts.SUBCONTRACTOR_SUPERVISOR,
                SUBCONTRACTOR_ADD: editsubcontracts.SUBCONTRACTOR_ADD,
                SUBCONTRACTOR_COUNTRY: editsubcontracts.SUBCONTRACTOR_COUNTRY,
                SUBCONTRACTOR_STATE: editsubcontracts.SUBCONTRACTOR_STATE,
                SUBCONTRACTOR_CITY: editsubcontracts.SUBCONTRACTOR_CITY,
            }));
        }
    }, [editsubcontracts]);

    const availableState = country?.find(
        (c) => c.name === editSubcontract.SUBCONTRACTOR_COUNTRY
    );

    const availableCities = availableState?.states?.find(
        (s) => s.name === editSubcontract.SUBCONTRACTOR_STATE
    );
    const headers = {
        "Content-Type": "application/json",
        authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
    };

    const handleEdit = (e) => {
        const { name, value } = e.target;
        setEditsubcontract((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const
        handleSubmit = (e) => {
            e.preventDefault();
            setUsernameError("");
            setNameError("");
            setPhoneError("");
            setErrorMsg("");

            // Validate the "Project Username" field
            if (!editSubcontract.SUBCONTRACTOR_USERNAME) {
                setUsernameError("Subcontractor Email is required.");
                return;

            }

            // Validate the "Project Name" field
            if (!editSubcontract.SUBCONTRACTOR_NAME) {
                setNameError("Subcontractor Name is required.");
                return;

            }

            // Validate the "Account" field
            if (!editSubcontract.SUBCONTRACTOR_PHONE) {
                setPhoneError("Contact Number is required.");
                return;
            }


            axios
                .put("/api/update_subcontructor",
                    {
                        SUBCONTRACTOR_ID: editsubcontracts.SUBCONTRACTOR_ID,
                        SUBCONTRACTOR_PARENT_ID: editsubcontracts.SUBCONTRACTOR_PARENT_ID,
                        SUBCONTRACTOR_PARENT_USERNAME: editsubcontracts.SUBCONTRACTOR_PARENT_USERNAME,
                        SUBCONTRACTOR_MEMBER_PARENT_ID: editsubcontracts.SUBCONTRACTOR_MEMBER_PARENT_ID,
                        SUBCONTRACTOR_MEMBER_PARENT_USERNAME: editsubcontracts.SUBCONTRACTOR_MEMBER_PARENT_USERNAME,
                        SUBCONTRACTOR_DETAILS_FOR_UPDATES: {
                            ...editSubcontract
                        }

                    }, {
                    headers,
                })
                .then((response) => {
                    if (response.data.operation === "failed") {
                        setErrorMsg(response.data.errorMsg);
                        toast.error(response.data.errorMsg, {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1000,
                        });
                    } else if (response.data.operation === "successfull") {
                        dispatch(setSubcontractor(response.data.result));
                        dispatch(getAllSubcontractor(response.data.result));
                        toast.success("Subcontract Updated successfully!", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1000,
                        });
                        // props.refetch();

                        setOpen(false);
                    }
                })
                .catch((error) => {
                    console.error(error, "ERR");
                });
        };

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="rounded"
                className="view-btn border border-info text-success "
                style={{ padding: "2px 2px" }}
            >
                Edit
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <h5>Edit Subcontractor</h5>
                        <div className="row py-2">
                            <div className="form-group col-xl-4">
                                <label>Subcontract Email</label>
                                <input
                                    type="text"
                                    className={`form-control form-control-2 rounded-0 ${usernameError ? "is-invalid" : ""
                                        }`}
                                    placeholder="Username"
                                    value={editSubcontract.SUBCONTRACTOR_USERNAME}
                                    name="SUBCONTRACTOR_USERNAME"
                                    onChange={handleEdit}

                                />
                                {usernameError && (
                                    <div className="invalid-feedback">{usernameError}</div>
                                )}
                            </div>
                            <div className="form-group col-xl-4">
                                <label>Subcontract Name</label>
                                <input
                                    type="text"
                                    className={`form-control form-control-2 rounded-0 ${nameError ? "is-invalid" : ""
                                        }`}
                                    id="inputname"
                                    placeholder="Project Name"
                                    value={editSubcontract.SUBCONTRACTOR_NAME}
                                    name="SUBCONTRACTOR_NAME"
                                    onChange={handleEdit}

                                />
                                {nameError && (
                                    <div className="invalid-feedback">{nameError}</div>
                                )}
                            </div>
                            <div className="form-group col-xl-4">
                                <label>Contact</label>
                                <input
                                    type="number"
                                    className={`form-control form-control-2 rounded-0 ${phoneError ? "is-invalid" : ""
                                        }`}
                                    id="inputPassword4"
                                    placeholder="Enter Phone Number"
                                    name="SUBCONTRACTOR_PHONE"
                                    value={editSubcontract.SUBCONTRACTOR_PHONE}
                                    onChange={handleEdit}

                                />
                                {phoneError && (
                                    <div className="invalid-feedback">{phoneError}</div>
                                )}
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="form-group col-xl-6">
                                <label>Project start date</label>
                                <input
                                    type="date"
                                    value={editSubcontract.SUBCONTRACTOR_START_DATE}
                                    name="SUBCONTRACTOR_START_DATE"
                                    onChange={handleEdit}
                                    className="form-control form-control-2 rounded-0"

                                />
                            </div>
                            <div className="form-group col-xl-6">
                                <label>Project End date</label>
                                <input
                                    type="date"
                                    value={editSubcontract.SUBCONTRACTOR_END_DATE}
                                    name="SUBCONTRACTOR_END_DATE"
                                    onChange={handleEdit}
                                    className="form-control form-control-2 rounded-0"

                                />
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="form-group col-xl-6">
                                <label>Subcontract ROLE</label>
                                <select
                                    id="inputEnroll"
                                    className="form-control form-control-2 border rounded-0"
                                    onChange={handleEdit}
                                    name="SUBCONTRACTOR_ROLE"
                                    value={editSubcontract.SUBCONTRACTOR_ROLE}
                                >
                                    <option selected>Choose...</option>
                                    <option>Painter</option>
                                    <option>Fitter</option>
                                    <option>Plumber</option>
                                    <option>Engineer</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Sub Contractor</label>
                                <input
                                    type="text"
                                    className="form-control form-control-2 rounded-0 "
                                    id="inputsupervisor"
                                    name="SUBCONTRACTOR_SUPERVISOR"
                                    value={editSubcontract.SUBCONTRACTOR_SUPERVISOR}
                                    onChange={handleEdit}
                                />
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="form-group  col-md-12">
                                <label>Address</label>
                                <textarea
                                    type="text"
                                    className="form-control form-control-2 rounded-0"
                                    id="inputAddress2"
                                    placeholder="Apartment, studio, or floor"
                                    name="SUBCONTRACTOR_ADD"
                                    value={editSubcontract.SUBCONTRACTOR_ADD}
                                    onChange={handleEdit}
                                />
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="form-group col-xl-4">
                                <label>Country</label>
                                <select
                                    className="form-control form-control-2 border rounded-0"
                                    placeholder="Country"
                                    name="SUBCONTRACTOR_COUNTRY"
                                    value={editSubcontract.SUBCONTRACTOR_COUNTRY}
                                    onChange={handleEdit}
                                >
                                    <option>--Choose Country--</option>
                                    {country?.map((value, key) => {
                                        return (
                                            <option value={value.name} key={key}>
                                                {value.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-xl-4">
                                <label>State</label>
                                <select
                                    className="
                  form-control form-control-2 border rounded-0"
                                    placeholder="State"
                                    name="SUBCONTRACTOR_STATE"
                                    value={editSubcontract.SUBCONTRACTOR_STATE}
                                    onChange={handleEdit}
                                >
                                    <option selected>--Choose State--</option>
                                    {availableState?.states?.map((e, key) => {
                                        return (
                                            <option value={e.name} key={key}>
                                                {e.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="form-group col-xl-4">
                                <label>City</label>
                                <select
                                    className="form-control form-control-2 border rounded-0"
                                    placeholder="City"
                                    name="SUBCONTRACTOR_CITY"
                                    value={editSubcontract.SUBCONTRACTOR_CITY}
                                    onChange={handleEdit}
                                >
                                    <option>--Choose City--</option>
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
                        <div className="FormButtonAlign">

                            <button
                                type="submit"
                                className="btn btn-info text-white"
                                onClick={handleSubmit}
                            >
                                Edit Subcontractor
                            </button>{" "}
                            <button
                                onClick={handleClose}
                                className="btn btn-danger text-white"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </Box>
            </Modal>
        </>
    );
}



