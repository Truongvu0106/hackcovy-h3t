import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_SAVE_PROFILE } from '../type';

export const authMarkLogin = payload => ({ type: AUTH_LOGIN, payload });
export const authSaveProfile = payload => ({
  type: AUTH_SAVE_PROFILE,
  payload
});
export const authLogout = () => ({ type: AUTH_LOGOUT });
