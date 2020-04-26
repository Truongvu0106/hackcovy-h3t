import { AUTH_LOGIN, AUTH_CLEAR, AUTH_SAVE_PROFILE } from '../type';

const initState = {
  isLogged: false,
  profile: null,
  lastLogin: null
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN:
      return {
        ...state,
        isLogged: true,
        profile: payload,
        lastLogin: Date.now()
      };
    case AUTH_SAVE_PROFILE: {
      const profile = state.profile;
      if (!profile) return { ...state, profile: payload };
      return {
        ...state,
        profile: { ...state.profile, ...payload }
      };
    }
    case AUTH_CLEAR:
      return initState;
    default:
      return state;
  }
};
