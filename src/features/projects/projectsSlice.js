import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchString: "",
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    search: (state, action) => {
      state.searchString = action.payload;
    },
  },
});

export const { search } = projectsSlice.actions;
export default projectsSlice.reducer;
