import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "allProject",
  initialState: {
    allProject: [],
  },
  reducers: {
    addProject: (state, action) => {
      state.allProject = [...action.payload];
    },
  },
});

export const { addProject } = projectSlice.actions;
export default projectSlice.reducer;
