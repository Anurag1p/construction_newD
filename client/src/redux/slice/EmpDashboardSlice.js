import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getIndividualEmployee = createAsyncThunk("employeeLogin/employee",

    async (empDetails, { rejectWithValue, disptach }) => {
        try {
            const response = await axios.put("/api/get_employee_details_for_attendence", empDetails)
            disptach(setEmployeeData(response.data.result));
            return response.data.result
        } catch (error) {
            rejectWithValue(error.message)
        }
    })



const employeeDashboard = createSlice({
    name: "empDetails",
    initialState: {
        empDetails: [],
        loading: "Please wait while we are fetching the data...",
        error: false,
    },
    reducers: {
        setEmployeeData: (state, action) => {
            state.empDetails = state.empDetails.concat(action.payload);
        }
    },

    extraReducers: (updation) => {
        updation
            .addCase(getIndividualEmployee.pending, (state) => {
                state.loading = "please wait while we are processing..."
            })
            .addCase(getIndividualEmployee.fulfilled, (state, action) => {
                state.loading = "success"
                state.empDetails = action.payload
            })
            .addCase(getIndividualEmployee.rejected, (state, action) => {
                state.loading = "failed..."
                state.error = action.payload
            })
    }
})
export default employeeDashboard.reducer;

export const { setEmployeeData } = employeeDashboard.actions;