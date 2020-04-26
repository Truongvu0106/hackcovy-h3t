import { CACHE_SAVE_INFO, UTILS_GET_LOCATION,IS_CONNECTED,
  SAVE_AGENT_LIST_SUCCESS,
  SAVE_LIST_LOCATION_SUCCESS,
  SAVE_PLACE_HIS,
  REMOVE_PLACE_RECENT,
  CHANGE_STATUS } from '../type';

export const saveCacheUser = payload => ({ type: CACHE_SAVE_INFO, payload });
export const markQuickLogin = payload => ({
  type: 'cacheUser/canQuickLogin',
  payload
});

export const getMyLocation = callBack => ({
  type: UTILS_GET_LOCATION,
  callBack
});

export const checkNetwork = payload => ({
  type: IS_CONNECTED,
  payload
})

export const saveAgentListSuccess = payload => ({
  type: SAVE_AGENT_LIST_SUCCESS,
  payload
})

export const saveLocationListSuccess = payload => ({
  type: SAVE_LIST_LOCATION_SUCCESS,
  payload
})

export const saveLocationHis = payload => ({
  type: SAVE_PLACE_HIS,
  payload
});

export const removePlaceRecent = () => ({
  type: REMOVE_PLACE_RECENT
});

export const changeStatus = () => ({ type: CHANGE_STATUS });
