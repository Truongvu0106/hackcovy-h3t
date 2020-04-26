import * as Keychain from 'react-native-keychain';
import FingerprintScanner from 'react-native-fingerprint-scanner';

export const deviceSupportType = async () =>
  await FingerprintScanner.isSensorAvailable();

export const saveDataNeedEnCrypt = async (username, password) =>
  await Keychain.setGenericPassword(username, password);

export const getDataSaved = async () => await Keychain.getGenericPassword();

export const clearDataSaved = async () => await Keychain.resetGenericPassword();
