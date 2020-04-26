'use strict';

import { NativeModules } from 'react-native';

type PermissionsName =
  | 'android.permission.READ_CALENDAR'
  | 'android.permission.WRITE_CALENDAR'
  | 'android.permission.CAMERA'
  | 'android.permission.READ_CONTACTS'
  | 'android.permission.WRITE_CONTACTS'
  | 'android.permission.GET_ACCOUNTS'
  | 'android.permission.ACCESS_FINE_LOCATION'
  | 'android.permission.ACCESS_COARSE_LOCATION'
  | 'android.permission.RECORD_AUDIO'
  | 'android.permission.READ_PHONE_STATE'
  | 'android.permission.CALL_PHONE'
  | 'android.permission.READ_CALL_LOG'
  | 'android.permission.WRITE_CALL_LOG'
  | 'com.android.voicemail.permission.ADD_VOICEMAIL'
  | 'android.permission.USE_SIP'
  | 'android.permission.PROCESS_OUTGOING_CALLS'
  | 'android.permission.BODY_SENSORS'
  | 'android.permission.SEND_SMS'
  | 'android.permission.RECEIVE_SMS'
  | 'android.permission.READ_SMS'
  | 'android.permission.RECEIVE_WAP_PUSH'
  | 'android.permission.RECEIVE_MMS'
  | 'android.permission.READ_EXTERNAL_STORAGE'
  | 'android.permission.WRITE_EXTERNAL_STORAGE';

type Permissions = string | Array<PermissionsName>;

export function checkPermission(perm) {
  return NativeModules.PermissionsModule.checkPermission(perm);
}

export function requestPermission(perm: Permissions) {
  if (typeof perm === 'string') perm = [perm];

  // permCode greater than 16 bits causes an error so limit code to max of 65535
  const maximum = 65535;
  const minimum = 1;

  const permCode =
    Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

  return NativeModules.PermissionsModule.requestPermission(perm, permCode);
}
