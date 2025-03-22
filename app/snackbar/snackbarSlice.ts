import { createSlice } from "@reduxjs/toolkit";

type SnackbarState = {
  display: boolean;
  message: string;
  severity: "success" | "error" | "";
  timeout: number;
};

const initialState: SnackbarState = {
  display: false,
  message: "",
  severity: "",
  timeout: 5000,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action) => {
      state.display = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.timeout = action.payload.timeout || 5000;
    },
    clearSnackbar: (state) => {
      state.display = false;
      state.severity = "";
      state.timeout = 5000;
    },
  },
});

export const { setSnackbar, clearSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
