import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    incompleteTasks: []
}

const tasks = createSlice({
    name: 'tasks',
    initialState,

    reducers: {
        getAllTasks: (state, payload) => {
            state = payload.action;
        },
        updateTask: (state, action) => {
            //action contains payload

            
        }
    }
})


export const {updateTask} = tasks.actions;

export default tasks.reducer;