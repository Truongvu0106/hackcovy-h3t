import { NativeModules, Alert } from 'react-native';
import Permissions from 'react-native-permissions';
import I18n from 'react-native-i18n';

export const Locations = NativeModules.Locations;
// const { isEnable, hasPermission } = Locations

export const requestPermision = () => {
  return new Promise((resolve, reject) => {
    Permissions.request('location', { type: 'always' })
      .then(response => {
        return resolve(response);
      })
      .catch(e => reject(e));
  });
};

export const checkPermission = () => {
  return new Promise((resolve, reject) => {
    Locations.checkPermissions()
      .then(result => {
        if (result && result.permission) {
          return resolve(result.permission);
        }
        return resolve(false);
      })
      .catch(e => reject(e));
  });
};
export const checkTurnOnLocationService = () => {
  return new Promise((resolve, reject) => {
    Locations.checkEnableLocationService()
      .then(result => {
        if (result) {
          return resolve(result);
        }
        return reject(new Error('Can not checkTurnOnLocationService'));
      })
      .catch(e => reject(e));
  });
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Locations.getCurrentPosition()
      .then(result => resolve(result))
      .catch(e => reject(e));
  });
};

export const openSetting = () => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      I18n.t('iosLocationHasBeenTurnOff'),
      I18n.t('iosPleaseTurnOnItInSetting'),
      [
        {
          text: I18n.t('iosOpenSettings'),
          onPress: () => handleOpenSetting(resolve, reject)
        }
      ],
      { cancelable: false }
    );
  });
};

// export const getCurrentLocations = async () => {
//   let result = null;
//   try {
//     const permisionResult = await Locations.checkPermissions();
//     const enableLocations: boolean = await Locations.checkEnableLocationService(); // bool
//     requestPermision();
//     if (permisionResult.permission && enableLocations) {
//       const resultRes: {
//         lat: string,
//         long: string
//       } = await Locations.getCurrentPosition();
//       console.log('result ==> ', resultRes);
//       return (result = resultRes);
//     }

//     Alert.alert(
//       'Locations services has been turn off',
//       'Please turn on it in Setting',
//       [
//         {
//           text: 'Open settings',
//           onPress: () => handleOpenSetting()
//         }
//       ],
//       { cancelable: false }
//     );
//     return result;
//   } catch (err) {
//     console.log('err ==> ', err);
//     Alert.alert(
//       'Locations services has been turn off or handware error',
//       'Please check your device'
//     );
//     return result;
//   }
// };

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

const handleOpenSetting = (resolve, reject) => {
  Permissions.canOpenSettings()
    .then(result => {
      Permissions.openSettings()
        .then(() => resolve(result))
        .catch(err => reject(err));
    })
    .catch(e => reject(e));
};
