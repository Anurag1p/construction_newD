import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//  inredux this calls as axction 
 export const getProjectData = createAsyncThunk("auth/companylogin/projects",
    async (projectData, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put("/api/get_projects", projectData)
            console.log(projectData, "projectDatate vivek")
            dispatch(setAllproject(response.data.result))
            return response.data.result;
        } catch (error) {
           
            return rejectWithValue(error.message)
        }
    }
)
//  now we have to create reducer for the above action 


const getAllProject = createSlice({
    name: "All_projects",
    initialState : {
        projects: [],
        error: false,
        loading: null
    },
    reducers: {
        setAllproject: (state, action) => {
            state.projects = state.projects.concat(action.payload)
        }
    },
    // now we are just making an extra reducer for the render and update again and again  

    extraReducers: (builder) => {
        builder
            .addCase(getProjectData.pending, (state) => {
                state.loading = "Please Wait while loading..."
            })
            .addCase(getProjectData.fulfilled, (state, action) => {
                state.loading = "Success"
                state.projects = action.payload
            })
            .addCase(getProjectData.rejected, (state, action) => {
                state.loading = "Failed"
                state.error = action.payload
            })
    }

})
export default getAllProject.reducer;

export const {setAllproject} = getAllProject.actions;

