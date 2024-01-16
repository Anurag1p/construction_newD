import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


 export const getSingleCompData = createAsyncThunk("auth/companyLogin/company",

    async (compData, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put("/api/get_company", compData)
            dispatch(setSingleComp(response.data.result));
            return response.data.result
        } catch (error) {
            return rejectWithValue(error.message);

        }

    })

// reducers for this

const getCompanyOne = createSlice({
    name: "singleCompany",
    initialState: {
        singleComp: null,
        error: false,
        loading: "Please wait While Proceeding..."
    },
    reducers: {
        setSingleComp: (state, action) => {
            state.singleComp = action.payload
        }
    }, 
    extraReducers:(updation) => {
        updation
        .addCase(getSingleCompData.pending, (state) => {
            state.loading = "Please wait While proceeding..."
        })
        .addCase(getSingleCompData.fulfilled, (state, action) => {
            state.loading = "Success"
            state.singleComp = action.payload
        }) 
        .addCase(getSingleCompData.rejected, (state, action) =>{
            state.loading = "Rejected"
            state.error  = action.payload
        })
        
    }
}) 
export default getCompanyOne.reducer;

export const {setSingleComp} = getCompanyOne.actions;