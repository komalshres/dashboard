import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  mode: string;
  profile: Record<string, string> | null;
};

const initialState: InitialStateType = {
  mode: "dark",
  profile: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setMode, setProfile } = globalSlice.actions;

export default globalSlice.reducer;
