import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterCriteria: {},
  },
  reducers: {
    addFilterCriteria: (state, action) => {
      state.filterCriteria = Object.assign(
        state.filterCriteria,
        action.payload
      );
    },
  },
});

export const { addFilterCriteria } = filterSlice.actions;
export default filterSlice.reducer;
