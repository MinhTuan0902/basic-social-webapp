import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginAsyncAction = createAsyncThunk(
  "user/login",
  async (loginData) => {
    const res = await fetch(
      "https://social-web-apii.herokuapp.com/api/users/login",
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    );

    const data = res.json();
    return data;
  }
);

const initialState = {
  loggedInUser: JSON.parse(localStorage.getItem("user")),
  accessToken: JSON.parse(localStorage.getItem("accessToken")),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedInUser = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsyncAction.pending, (state) => {
      state.loggedInUser = null;
    });

    builder.addCase(loginAsyncAction.fulfilled, (state, action) => {
      if (action.payload.accessToken && action.payload.userData) {
        localStorage.setItem("user", JSON.stringify(action.payload.userData));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
        state.loggedInUser = action.payload.userData;
        state.accessToken = action.payload.accessToken;
      }
    });

    builder.addCase(loginAsyncAction.rejected, (state) => {
      state.loggedInUser = null;
      state.accessToken = null;
    });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
