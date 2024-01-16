import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const getAllDocuments = createAsyncThunk("auth/companylogin/documents",

    async (docData, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put("/api/get_all_document", docData)
            dispatch(setDocument(response.data.result))
            return response.data.result
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)


const compDocument = createSlice({
    name: "companyDoc",
    initialState: {
        documents:[],
        loading: "Please wait while we are getting the documents..",
        error: false
    },
    reducers: {
        setDocument: (state, action) => {
            state.documents = state.documents.concat(action.payload)
        }
    },

    extraReducers: (updation) => {
        updation
            .addCase(getAllDocuments.pending, (state) => {
                state.loading = "Please wait while we are getting the documents..."
            })
            .addCase(getAllDocuments.fulfilled, (state, action) => {
                console.log('Fulfilled action triggered:', action);
                state.loading = "success"
                state.documents = action.payload
            })
            .addCase(getAllDocuments.rejected, (state, action) => {
                state.loading = "Failed"
                state.error = action.payload
            })
    }
})
export default compDocument.reducer;

export const { setDocument } = compDocument.actions