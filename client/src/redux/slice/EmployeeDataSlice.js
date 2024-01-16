import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getEmployeeData = createAsyncThunk("auth/companyLogin/employee",

    async (EmpData, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put("/api/get_employee", EmpData);
            dispatch(setEmployeeData(response.data.result))
            return response.data.result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


const employeData = createSlice({
    name: "EmployeeData",
    initialState: {
        employees: [],
        error: false,
        loading: "Please Wait while we are Processing..."
    },
    reducers: {
        setEmployeeData: (state, action) => {
            state.employees = state.employees.concat(action.payload);
            // state = { ...state, employees: action.payload || [] }

        },

    },

    extraReducers: (updation) => {
        updation
            .addCase(getEmployeeData.pending, (state) => {
                state.loading = "Please wait while we are processing..."
            })
            .addCase(getEmployeeData.fulfilled, (state, action) => {
                state.loading = "success"
                state.employees = action.payload
            })
            .addCase(getEmployeeData.rejected, (state, action) => {
                state.loading = "Failed"
                state.error = action.payload
            })
    }
})
export default employeData.reducer;

export const { setEmployeeData } = employeData.actions