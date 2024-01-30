import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const getAllttendance = createAsyncThunk("auth/company/attendance",
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put("/api/get_employee_details_for_attendence", data);
            dispatch(setAttendence(response.data.result))
            return response.data.result
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

const attendanceDetails = createSlice({
    name: "attendance",
    initialState: {
        attendance: [],
        loading: "Please Wait while we are fetching the details...",
        error: false,
    },
    reducers: {
        setAttendence: (state, action) => {
            state.attendance = action.payload;
        }
    },

    extraReducers: (updation) => {
        updation
            .addCase(getAllttendance.pending, (state) => {
                state.loading = "Please wait while we are fetching the details..."
            })
            .addCase(getAllttendance.fulfilled, (state, action) => {
                state.loading = "success"
                state.attendance = action.payload
            })
            .addCase(getAllttendance.rejected, (state, action) => {
                state.loading = "failed"
                state.error = action.payload
            })
    }
})
export default attendanceDetails.reducer;

export const { setAttendence } = attendanceDetails.actions;