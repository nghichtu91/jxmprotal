import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { Role } from '@/interface/user/login';
import { Locale, UserState } from '@/interface/user/user';
import { createAsyncAction } from './utils';
import { getGlobalState } from '@/utils/getGloabal';
import { IUserEntity } from '@/domains/entities/interfaces';

const initialState: UserState = {
  ...getGlobalState(),
  noticeCount: 0,
  locale: (localStorage.getItem('locale')! || 'en_US') as Locale,
  newUser: JSON.parse(localStorage.getItem('newUser')!) ?? false,
  logged: localStorage.getItem('t') ? true : false,
  menuList: [],
  username: '',
  role: 'GUEST' as Role,
  phone: '',
  point1: 0,
  isPlay: false,
  locked: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserItem(state, action: PayloadAction<Partial<UserState>>) {
      const { username } = action.payload;

      if (username !== state.username) {
        localStorage.setItem('username', action.payload.username || '');
      }

      Object.assign(state, action.payload);
    },
  },
});

export const { setUserItem } = userSlice.actions;

export default userSlice.reducer;

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const loginAsync = createAsyncAction<string, boolean>(payload => {
  return async dispatch => {
    dispatch(
      setUserItem({
        logged: true,
        username: payload,
      }),
    );

    return true;
  };
});

export const updateUserItem = createAsyncAction<IUserEntity, boolean>(payload => {
  return async dispatch => {
    dispatch(
      setUserItem({
        username: payload.userName,
        newUser: payload.isNew,
        logged: true,
        role: payload.role || 'GUEST',
        isPlay: payload.isPlay,
        locked: payload.locked,
        phone: payload.phone,
        point1: payload.point1,
        createdAt: payload.createdAt,
        email: payload.email,
      }),
    );

    return true;
  };
});

export const logoutAsync = () => {
  return async (dispatch: Dispatch) => {
    localStorage.clear();
    dispatch(
      setUserItem({
        logged: false,
        username: undefined,
        newUser: false,
      }),
    );

    return true;
  };
};
