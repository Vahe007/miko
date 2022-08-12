import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from '../features/todos/todosSlice';

const store = configureStore({
    reducer: {
        tasks: tasksReducer
    }
})


export default store;