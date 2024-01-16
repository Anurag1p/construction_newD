import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const getAllSubcontractor = createAsyncThunk("auth/companylogin/company/subcontractor",

    async (subData, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put("/api/get_subcontractor", subData)
            dispatch(setSubcontractor(response.data.result))
            return response.data.result
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)


const subcontractors = createSlice({
    name: "subcontractor",
    initialState: {
        subcontractor:[],
        loading: "Please wait while we are getting the documents..",
        error: false
    },
    reducers: {
        setSubcontractor: (state, action) => {
            state.subcontractor = state.subcontractor.concat(action.payload)
        }
    },

    extraReducers: (updation) => {
        updation
            .addCase(getAllSubcontractor.pending, (state) => {
                state.loading = "Please wait while we are processing data..."
            })
            .addCase(getAllSubcontractor.fulfilled, (state, action) => {
                state.loading = "success"
                state.subcontractor = action.payload
            })
            .addCase(getAllSubcontractor.rejected, (state, action) => {
                state.loading = "Failed"
                state.error = action.payload
            })
    }
})
export default subcontractors.reducer;

export const { setSubcontractor } = subcontractors.actions