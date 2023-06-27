import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: {
    username: "",
    isAdmin: false,
    roomCode: false
  },
  reducers: {
    changeUserDatas(state, {payload}) {
      return {...state, 
        username: payload.username,
        isAdmin: payload.isAdmin,
        roomCode: payload.roomCode
      }
    },
    changeRoomCode(state, {payload}) {
      return {...state,
        roomCode: payload
      }
    },
    logout(state) {
      return {...state,
        username: "",
        isAdmin: false,
        roomCode: false
      }
    }
  }
});

export const {changeUserDatas, changeRoomCode, logout} = slice.actions;

export const selectUsername = state => state.username;
export const selectIsAdmin = state => state.isAdmin;
export const selectRoomCode = state => state.roomCode;

export default slice.reducer;