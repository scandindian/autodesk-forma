import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFileData, IPolygonData } from "../types";
import { importedFileData } from "../utility";

interface GeoJsonDataState {
  fileData: IFileData[];
  selectedSolution: IFileData | null;
  polygonData: IPolygonData[];
}

const initialState: GeoJsonDataState = {
  fileData: importedFileData,
  selectedSolution: importedFileData.length > 0 ? importedFileData[0] : null,
  polygonData: [],
};

const geoJsonDataSlice = createSlice({
  name: "geoJsonData",
  initialState,
  reducers: {
    setFileData: (state, action: PayloadAction<IFileData[]>) => {
      state.fileData = action.payload;
    },
    setSelectedSolution: (state, action: PayloadAction<IFileData>) => {
      state.selectedSolution = action.payload;
    },
    setPolygonData: (state, action: PayloadAction<IPolygonData[]>) => {
      state.polygonData = action.payload;
    },
  },
});

export const { setFileData, setSelectedSolution, setPolygonData } =
  geoJsonDataSlice.actions;
export default geoJsonDataSlice.reducer;
