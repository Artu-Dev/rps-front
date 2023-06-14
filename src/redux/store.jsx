import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSocketSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  }
});