// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { dispatch } from '../index';

// types
import { ChatStateProps } from 'types/chat';

// ==============================|| SLICE - CHAT||============================== //

const backendURL: string = process.env.SHIPFINEX_BACKEND_URL as string;
const initialState: ChatStateProps = {
  error: null,
  chats: [],
  user: {},
  users: []
};

const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET USER
    getUserSuccess(state, action) {
      state.user = action.payload;
    },

    // GET USER CHATS
    getUserChatsSuccess(state, action) {
      state.chats = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.users = action.payload;
    }
  }
});

// Reducer
export default chat.reducer;

// ==============================|| CHAT - API CALL ||============================== //

export function getUser(id: number) {
  return async () => {
    try {
      const response = await axios.post('/api/chat/users/id', { id });
      dispatch(chat.actions.getUserSuccess(response.data));
    } catch (error) {
      dispatch(chat.actions.hasError(error));
    }
  };
}

export function getUserChats(user: string | undefined) {
  return async () => {
    try {
      const response = await axios.post(`${backendURL}/api/v1/chat/filter`, { user });
      dispatch(chat.actions.getUserChatsSuccess(response.data));
    } catch (error) {
      dispatch(chat.actions.hasError(error));
    }
  };
}

export function insertChat(newChat: any) {
  return async () => {
    try {
      await axios.post(`${backendURL}/api/v1/chat/insert`, { chat: newChat });
    } catch (error) {
      dispatch(chat.actions.hasError(error));
    }
  };
}

export function getUsers() {
  return async () => {
    try {
      const response = await axios.get(`${backendURL}/api/v1/chat/users`);
      dispatch(chat.actions.getUsersSuccess(response.data.users));
    } catch (error) {
      dispatch(chat.actions.hasError(error));
    }
  };
}
