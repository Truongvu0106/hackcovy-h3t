import DeviceInfo from 'react-native-device-info';
import { AsyncStorage } from 'react-native';
import createCompressEncryptor from 'redux-persist-security';
import { persistCombineReducers } from 'redux-persist';
import { reducer as form } from 'redux-form';

import auth from './auth';
import imagesUrl from './imagesUrl';
import { locale, cacheUser ,checkNetwork,savePlaceSearch} from './common';
import { isIOS } from 'Root/src/utils/iPhoneXHelper';

const transformer = createCompressEncryptor({
  secretKey: '!OGnJ^HNi8Hx6WX1uu%YRYrxA7A9%7GIMZ93wI',
  whitelist: ['auth', 'cacheUser'],
  onError: error => {
    console.log(error);
  }
});

const config = {
  key: 'MytelCSE',
  storage: AsyncStorage,
  whitelist: ['auth', 'locale', 'cacheUser','checkNetwork','savePlaceSearch'],
  transforms: [transformer]
};

export default persistCombineReducers(config, {
  auth,
  form,
  locale,
  cacheUser,
  imagesUrl,
  checkNetwork,
  savePlaceSearch,
  device: () =>
    `${DeviceInfo.getBrand().toString()} ${
      isIOS
        ? DeviceInfo.getDeviceName().toString()
        : DeviceInfo.getModel().toString()
    }`
});
