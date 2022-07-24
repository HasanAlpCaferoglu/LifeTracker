import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import routineService from "./routineService";

const initialState = {
  routines: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new Routine
export const createRoutine = createAsyncThunk(
  "routines/create",
  async (routineData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await routineService.createRoutine(routineData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get user routines
export const getRoutines = createAsyncThunk(
  "routines/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await routineService.getRoutines(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete user routine
export const deleteRoutine = createAsyncThunk(
  "routines/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await routineService.deleteRoutine(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const routineSlice = createSlice({
  name: "routine",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoutine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRoutine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.routines.push(action.payload); // redux toolkit allow us to push
      })
      .addCase(createRoutine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRoutines.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoutines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.routines = action.payload;
      })
      .addCase(getRoutines.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRoutine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRoutine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // in backend, when delete request is made, it will return the goal id
        state.routines = state.routines.filter(
          (routine) => routine._id !== action.payload.id
        );
      })
      .addCase(deleteRoutine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = routineSlice.actions;
export default routineSlice.reducer;
