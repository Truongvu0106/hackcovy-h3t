import { CLEAR_IMAGES, SAVE_IMAGES } from '../type';

const initState = {
  data: [{ val: '', id: null }]
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case SAVE_IMAGES: {
      return {
        ...state,
        data: payload
      };
    }
    case CLEAR_IMAGES:
      return {
       data: [{ val: '', id: null }]
     };
    default:
      return state;
  }
};
