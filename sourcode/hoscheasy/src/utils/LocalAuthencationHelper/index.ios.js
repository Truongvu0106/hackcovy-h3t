import * as Keychain from 'react-native-keychain';

export const deviceSupportType = async () =>
  await Keychain.getSupportedBiometryType();

export const saveDataNeedEnCrypt = async (username, password, accessControl) =>
  await Keychain.setGenericPassword(username, password, { accessControl });

export const getDataSaved = async options =>
  await Keychain.getGenericPassword(options);

export const clearDataSaved = async () => await Keychain.resetGenericPassword();
