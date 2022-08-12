import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    incompleteTasks: []
}

export const get_All_Tasks = (state) => {
    return state.tasks.tasks;
}

export const getIncompleteTasks = (state) => state.tasks.incompleteTasks;


const tasks = createSlice({
    name: 'tasks',
    initialState,

    reducers: {
        getAllTasks: (state, { payload }) => {
            state.tasks = payload;
            state.incompleteTasks = payload.filter((item) => !item.completed);
        },
        updateTask: (state, { payload }) => {
            const { completed, id, title } = payload;
            let pos;
            state.tasks.forEach((el, index) => {
                if (el.id === id) {
                    pos = index;
                }
            })

            state.tasks[pos] = {
                id,
                completed: !completed,
                title
            }
            state.incompleteTasks = state.tasks.filter((item) => !item.completed);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        addTask: (state, { payload }) => {
            state.tasks = [payload, ...state.tasks];
            state.incompleteTasks = state.tasks.filter((item) => !item.completed);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        deleteTask: (state, { payload }) => {
            const remainingData = state.tasks.filter((task) => task.id !== payload);
            state.tasks = remainingData;
            state.incompleteTasks = state.tasks.filter((item) => !item.completed);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
    }
})


export const { updateTask, getAllTasks, addTask, deleteTask } = tasks.actions;

export default tasks.reducer;