import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertState } from "./alertTypes";

const initialState: AlertState = {
  message: null,
  type: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertState>) => {
      clearAlert();
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearAlert: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
