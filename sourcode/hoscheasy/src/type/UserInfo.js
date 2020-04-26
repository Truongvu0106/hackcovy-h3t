/** @flow **/

export type InfoUserFrom311100 = {
  accountId: number,
  accountStatus: number,
  currencyCode: number,
  customerGender: string,
  customerName: string,
  customerPhone: string,
  language: string,
  orgAmount: string,
  pan: number,
  paperNumber: string,
  parentCode: number,
  phoneNumber: string,
  staffCode: number
};

export type InfoUserFrom000004 = {
  pan: number,
  // transDate: 20190108101150,
  phoneNumber: string,
  customerName: string,
  customerBirthday: number, // 20181203
  customerGender: 'FEMALE' | 'MALE' | 'ORTHER',
  currencyCode: number, // 104
  paperType: string, // PPID
  paperNumber: string, // '013110887',
  customerPhone: string, // '09691024205',
  // messageSignature: '16fa03f9b9a5737ff1558c010f39dd10',
  carriedPhone: string, // '09691024205',
  carriedAccountId: number, // 19447,
  accountId: number, // 19447,
  balance: string, // '999,973 Kyats',
  accountStatus: number,
  carriedName: string, // 'CSE_PhuongTest',
  token: string, // 'gYnQlLQbYyOvGaZChzWwtcNPsSqGAmgp2iZxuhAHXfSd6EypbGOe3upFVrCw4m0j',
  version: string // 'CSE_2.0.0'
};
export type InfoUserFrom311001 = {
  pan: number,
  processCode: number,
  transactionFee: string,
  phoneNumber: string,
  actionId: number,
  currencyCode: number,
  messageSignature: string,
  carriedPhone: string,
  carriedAccountId: number,
  accountId: number,
  balance: string,
  carriedName: string,
  token: string
};
