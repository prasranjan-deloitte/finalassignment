import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
  reducer: {
    allProject: projectSlice,
    filter: filterSlice,
  },
});
export default store;
