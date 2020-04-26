import { SETTING_CHANGE_LANGUAGE, CACHE_SAVE_INFO,IS_CONNECTED,
  SAVE_AGENT_LIST_SUCCESS,
  SAVE_LIST_LOCATION_SUCCESS,
  SAVE_PLACE_HIS,
  REMOVE_PLACE_RECENT,
  CHANGE_STATUS } from '../type';

export const locale = (state = 'en_US', { type, payload }) => {
  switch (type) {
    case SETTING_CHANGE_LANGUAGE:
      return payload;
    default:
      return state;
  }
};
// const initCacheUser = {
//   accountId: '',
//   accountStatus: '',
//   customerName: '',
//   customerPhone: '',
//   pan: 0,
//   paperNumber: '',
//   parentCode: '',
//   phoneNumber: '',
//   staffCode: 0
// };
export const cacheUser = (
  state = { canQuickLogin: false },
  { type, payload }
) => {
  switch (type) {
    case CACHE_SAVE_INFO:
      return payload;
    case 'cacheUser/clearAll':
      return {};
    case 'cacheUser/canQuickLogin':
      return { ...state, canQuickLogin: payload };
    default:
      return state;
  }
};

const defaultState = {
  isConnected: true,
  saveAgentList: false,
  saveLocationList: false
};

export const checkNetwork = (state = defaultState, { type, payload }) => {
  switch (type) {
    case IS_CONNECTED:
      return {
        ...state,
        isConnected: payload
      };

    case SAVE_AGENT_LIST_SUCCESS:
      return {
        ...state,
        saveAgentList: payload
      };

    case SAVE_LIST_LOCATION_SUCCESS:
      return {
        ...state,
        saveLocationList: payload
      };
    default:
      return state;
  }
};


export const savePlaceSearch = (
  state = {
    listPlaceHis: [],
    placeRecent: null,
    nothingHappen: false
  },
  { type, payload }
) => {
  switch (type) {
    case SAVE_PLACE_HIS: {
      return {
        listPlaceHis: handleList(payload, state.listPlaceHis),
        placeRecent: payload,
        nothingHappen: false
      };
    }

    case CHANGE_STATUS: {
      return {
        ...state,
        nothingHappen: true
      };
    }

    case REMOVE_PLACE_RECENT:
      return {
        ...state,
        placeRecent: null,
        nothingHappen: false
      };

    default:
      return state;
  }
};

const handleList = (newItem, list) => {
  if (Array.isArray(list)) {
    console.log("list.length", list.length);
    switch (list.length) {
      case 0:
        return [newItem];
      case 5: {
        console.log("5", 5);
        let isUpdate = false;
        list.forEach(item => {
          if (item.location.placeID === newItem.location.placeID) {
            isUpdate = true;
          }
        });
        // neu co ban ghi giong nhau thi update
        if (isUpdate) {
          return list
            .map(item => {
              if (item.location.placeID === newItem.location.placeID) {
                return {
                  ...item,
                  date: newItem.date
                };
              }
              return item;
            })
            .sort((item1, item2) => item2.date - item1.date);
        }
        // neu ko co ban ghi nao trung thi xoa phan tu cuoi va them ban ghi moi vao
        else {
          return list
            .splice(4, 1, newItem)
            .sort((item1, item2) => item2.date - item1.date);
          // console.log('list',list)
        }
      }
      default: {
        console.log("default");
        let isUpdate = false;
        list.forEach(item => {
          if (item.location.placeID === newItem.location.placeID) {
            isUpdate = true;
          }
        });
        console.log("isUpdate", isUpdate);
        // neu co ban ghi giong nhau thi update
        if (isUpdate) {
          return list
            .map(item => {
              if (item.location.placeID === newItem.location.placeID) {
                return {
                  ...item,
                  date: newItem.date
                };
              }
              return item;
            })
            .sort((item1, item2) => item2.date - item1.date);
          // console.log("list", list);
        }
        // neu ko co ban ghi nao trung thi them vao binh thuong
        else {
          return list
            .concat([newItem])
            .sort((item1, item2) => item2.date - item1.date);
        }
      }
    }
  }
};