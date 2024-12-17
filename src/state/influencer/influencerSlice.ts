import { Influencer, InfluencerFormData } from "../../types/influencer";
import { InfluencerStoreState } from "./influencerTypes";
import { influencerService } from "./influencerApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAlert } from "../alert/alertSlice";
import { ALERT_TYPE } from "../alert/alertTypes";

export const fetchInfluencers = createAsyncThunk(
  "influencers/fetchInfluencers",
  async (searchQuery: string, { rejectWithValue, dispatch }) => {
    try {
      return await influencerService.fetchInfluencers(searchQuery);
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Failed to fetch influencers",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

export const createInfluencer = createAsyncThunk(
  "influencers/createInfluencer",
  async (influencerData: InfluencerFormData, { rejectWithValue, dispatch }) => {
    try {
      const response = await influencerService.createInfluencer(influencerData);
      dispatch(
        setAlert({
          message: "Success when creating influencer",
          type: ALERT_TYPE.SUCCESS,
        })
      );
      return response;
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Error when creating influencer",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateInfluencer = createAsyncThunk(
  "influencers/updateInfluencer",
  async (influencer: Influencer, { rejectWithValue, dispatch }) => {
    try {
      const response = await influencerService.updateInfluencer(influencer);
      dispatch(
        setAlert({
          message: "Success when updating influencer",
          type: ALERT_TYPE.SUCCESS,
        })
      );
      return response;
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Error when updating influencer",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteInfluencer = createAsyncThunk(
  "influencers/deleteInfluencer",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await influencerService.deleteInfluencer(id);
      dispatch(
        setAlert({
          message: "Success when deleting influencer",
          type: ALERT_TYPE.SUCCESS,
        })
      );

      return response;
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Error when deleting influencer",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: InfluencerStoreState = {
  influencers: [],
  loading: true,
  error: false,
};

const influencersSlice = createSlice({
  name: "influencers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInfluencers.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchInfluencers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.influencers = action.payload;
    });
    builder.addCase(fetchInfluencers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    // Create Influencer
    builder.addCase(createInfluencer.fulfilled, (state, action) => {
      state.influencers.push(action.payload);
    });

    // Update Influencer
    builder.addCase(updateInfluencer.fulfilled, (state, action) => {
      state.influencers.map((influencer, index) => {
        if (influencer.id === action.payload.id) {
          state.influencers[index] = action.payload;
        }
      });
    });

    // Delete Influencer
    builder.addCase(deleteInfluencer.fulfilled, (state, action) => {
      state.influencers = state.influencers.filter(
        (influencer) => influencer.id !== action.meta.arg
      );
    });
  },
});

export default influencersSlice.reducer;
