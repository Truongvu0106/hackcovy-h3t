import { NativeModules, Alert, PermissionsAndroid } from 'react-native';
import I18n from 'react-native-i18n';
import { requestPermission } from '../AnroidPermisions';

export const Locations = NativeModules.Locations;

export const requestPermision = () => {
  return new Promise((resolve, reject) => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    ])
      .then(grant => {
        if (
          grant[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grant[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          return resolve(grant);
        }
        return resolve(false);
      })
      .catch(e => reject(e));
  });
};

export const openSetting = () => {
  Alert.alert(
    I18n.t('pleaseTurnOnGPSSettings'),
    I18n.t('openLocationSetting'),
    [{ text: I18n.t('turnOnGPS'), onPress: () => Locations.openLocationSetting() }],
    { cancelable: false }
  );
  return Promise.resolve(true);
};

export const checkPermission = () => {
  return new Promise((resolve, reject) => {
    Locations.checkPermision()
      .then(result => {
        if (result) {
          return resolve(result);
        }
        return resolve(false);
      })
      .catch(e => reject(e));
  });
};
export const checkTurnOnLocationService = () => {
  return new Promise((resolve, reject) => {
    Locations.areProvidersAvailable()
      .then(result => {
        if (result) {
          return resolve(result);
        }
        return resolve(false);
      })
      .catch(e => reject(e));
  });
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Locations.getFusedLocation(false)
      .then(result => resolve(result))
      .catch(e => reject(e));
  });
};

export function getDistance(lat1, lon1, lat2, lon2) {
  let unit = 'km';
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  }
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344;
  if (dist > 1) {
    return `${Math.floor(dist)}${unit}`;
  }

  unit = 'm';
  return `${Math.floor(dist * 1000)}${unit}`;
}
