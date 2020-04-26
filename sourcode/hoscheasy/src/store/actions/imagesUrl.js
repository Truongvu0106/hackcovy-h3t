import { SAVE_IMAGES, CLEAR_IMAGES } from '../type';

export const saveImages = payload => ({ type: SAVE_IMAGES, payload });
export const clearImages = () => ({ type: CLEAR_IMAGES });
