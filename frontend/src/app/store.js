import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalReducer from "../features/goals/goalSlice";
import routineReducer from "../features/routines/routineSlice"
import todoReducer from "../features/todos/todoSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    routines: routineReducer,
    todos: todoReducer,
  },
});
