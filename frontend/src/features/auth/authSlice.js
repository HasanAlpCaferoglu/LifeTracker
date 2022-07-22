import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // thunk function allow you to have async functions and then update you state
import authService from "./authService";

// when we register or login we get back basic user data and json web token which is important.
// We need json web token to access protected routes
// We get json web token and save it to local storage

// Get user form localStorage
const user = JSON.parse(localStorage.getItem("user")); // localStorage can only have strings so need to parse it

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
// have async thunk function which deal with async data
// first parameter is the string with the action which is going to be auth/register
// second parameter is async function
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    // user get passed in from the register page or the register component
    try {
      return await authService.register(user); // makes the request to register and put the user in local store
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message); // reject and it will send an error message as the payload
    }
  }
);
// when making register, need to account for the pending state, fulfilled state if everything is ok, and rejected if there is an error since thunks returns a promise

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    // user get passed in from the register page or the register component
    try {
      return await authService.login(user); // makes the request to register and put the user in local store
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message); // reject and it will send an error message as the payload
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    }, // used to reset the state values to initial states. This function will be dispatched after register
  }, // any reducer function in the reducers object put here will not be async, i.e., they won't thunk functions.
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        // need to take action since we get data(user token) back when fulfilled
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // we returning the payload when register function above is run (line 27)
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // error message is returned which will be payload in register func. above (line 36)
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; 
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; 
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      });
  }, // thunk functions are written here
});

export const { reset } = authSlice.actions; // to export reducers defined in reducers
export default authSlice.reducer; // export reducer itself to import authReducer in store.js file under app folder
