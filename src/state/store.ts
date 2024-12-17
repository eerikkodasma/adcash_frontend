import influencerReducer from "./influencer/influencerSlice";
import employeeReducer from "./employee/employeeSlice";
import alertReducer from "./alert/alertSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    influencer: influencerReducer,
    employee: employeeReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
