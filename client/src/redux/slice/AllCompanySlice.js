import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


export const getAllCompany = createAsyncThunk("adminLogin/company",
    async (allComp, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put("/api/get_all_company", allComp)
            dispatch(setCompanyData(response.data.result))
            return response.data.result;
        } catch (error) {
            rejectWithValue(error.message);
        }
    })


const companyDataSlice = createSlice({
    name: "companyData",
    initialState: {
        company: [],
        loading: "Please wait while we are processing the data...",
        error: false
    },

    reducers: {
        setCompanyData: (state, action) => {
            state.company = state.company.concat(action.payload);
        }
    },

    extraReducers: (updation) => {
        updation
            .addCase(getAllCompany.pending, (state) => {
                state.loading = "please wait while we are processing the data..."
            })
            .addCase(getAllCompany.fulfilled, (state, action) => {
                state.loading = "success"
                state.company = action.payload
            })
            .addCase(getAllCompany.rejected, (state, action) => {
                state.loading = "Failed"
                state.company = action.payload
            })
    }
})
export default companyDataSlice.reducer

export const { setCompanyData } = companyDataSlice.actions