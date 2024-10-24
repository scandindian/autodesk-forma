import { configureStore } from "@reduxjs/toolkit";
import geoJsonDataReducer from "./slice";

const store = configureStore({
  reducer: {
    geoJsonData: geoJsonDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
