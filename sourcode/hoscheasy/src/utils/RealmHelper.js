// import 'babel-polyfill';
// const Realm = require('realm');

// const agentObj = {
//   name: 'agentObj',
//   primaryKey: 'CODE',
//   properties: {
//     CODE: { type: 'int', default: 0 },
//     PHONE: { type: 'int', default: 0 },
//     CHANNEL_NAME: { type: 'string', default: '',optional:true},
//     PROVINCE: { type: 'string', default: '' },
//     DISTRICT: { type: 'string', default: '' },
//     TOWNSHIP: { type: 'string', default: '' },
//     ADDRESS: { type: 'string?', default: '' },
//     LATITUDE: { type: 'float', default: '' },
//     LONGITUDE: { type: 'float', default: '' },
//     DISTANCE: { type: 'float', default: '' },
//     RATINGS: { type: 'int', default: 0 },
//     BALANCE: { type: 'string', default: '' }
//   }
// };
// const agentList = {
//   name: 'agentList',
//   properties: {
//     'object': { type: 'list', objectType: 'agentObj' } }
// };

// const databaseOptions = {
//   schema: [agentObj, agentList],
//   path: 'agentList.realm'
// };

// export const saveListAgent = (data) => new Promise((resolve, reject) => {
//   Realm.open(databaseOptions)
//     .then(realm => {
//       realm.write(() => {
//         realm.create('agentList', {
//           object: data
//         });
//         console.log('==> Save list agent success');
//       });
//       resolve(data)
//     })
//     .catch(error => {
//       console.log('==> Save list agent error', error);
//       reject(error)
//     });
// });

// export const updateAgent = (agent) => {
//   Realm.open(databaseOptions)
//     .then(realm => {
//       realm.write(() => {
//         realm.create('agentObj', agent, true);
//       });
//       console.log('==> Update agent success');
//     })
//     .catch(error => {
//       console.log('==> Update agent false', error);
//     });
// };

// export const updateListAgent = (arrAgent) => {
//   Realm.open(databaseOptions)
//     .then(realm => {
//       arrAgent.forEach(agent => {
//         realm.write(() => {
//           realm.create('agentObj', agent, true);
//         });
//         console.log('==> Update list agent success');
//       });
//     })
//     .catch(error => {
//       console.log('==> Update list agent false', error);
//     });
// };

// export const getAllAgent = () => new Promise((resolve, reject) => {
//   Realm.open(databaseOptions).then(realm => {
//     const data = realm.objects('agentObj');
//     // console.log('Realm data list agent', JSON.stringify(data));
//     resolve(JSON.stringify(data));
//   }).catch((error) => {
//     reject(error);
//   });
// });

// export const paginationListAgent = (currentPage) => new Promise((resolve, reject) => {
//   Realm.open(databaseOptions).then(realm => {
//     const pageSize = 20;
//     const start = pageSize * (currentPage - 1);
//     const end = start + pageSize;
//     const data = realm.objects('agentObj').slice(start, end);
//     resolve(data);
//   }).catch((error) => {
//     reject(error);
//   });
// });

// export const filterAgentByArea = (cluster, district, township) => new Promise((resolve, reject) => {
//   Realm.open(databaseOptions).then(realm => {
//     const allAgent = realm.objects('agentObj');
//     const query = `PROVINCE = "${cluster}" AND DISTRICT = "${district}" AND TOWNSHIP = "${township}"`;
//     const filteredAgent = allAgent.filtered(query);
//     const results = [];
//     for (const a of filteredAgent) {
//       results.push(a);
//     }
//     resolve(results);
//   }).catch((error) => {
//     reject(error);
//   });
// });


// const locationObj = {
//   name: 'locationObj',
//   primaryKey: 'AREA_CODE',
//   properties: {
//     AREA_ID: { type: 'int?', default: 0 },
//     AREA_CODE: { type: 'string?', default: '' },
//     AREA_NAME: { type: 'string?', default: '' },
//     PARENT_CODE: { type: 'string?', default: '' },
//   }
// };

// const locationList = {
//   name: 'locationList',
//   properties: {
//     'object': { type: 'list', objectType: 'locationObj' }
//   }
// };

// const databaseOptionsLocation = {
//   schema: [locationObj, locationList],
//   path: 'locationList.realm'
// };

// export const saveListLocation = (data) => new Promise((resolve, reject) => {
//   Realm.open(databaseOptionsLocation).then(realm => {
//     realm.write(() => {
//       realm.create('locationList', {
//         object: data
//       });
//       console.log('==> Save list location success');
//     });
//     resolve(data)
//   }).catch((error) => {
//     reject(error);
//   });
// });

// export const updateListLocation = (newData) => new Promise((resolve, reject) => {
//   Realm.open(databaseOptionsLocation).then(realm => {
//     newData.forEach(location => {
//       realm.write(() => {
//         realm.create('locationObj', location, true);
//       });
//     });
//     resolve('Update list location success');
//   }).catch((error) => {
//     reject(error);
//   });
// });

// export const getLisLocationByKey = (key = 'MM') => new Promise((resolve, reject) => {
//   Realm.open(databaseOptionsLocation).then(realm => {
//     var results = [];
//     realm.write(() => {
//       const filteredLocation = realm.objects('locationObj').filtered(`PARENT_CODE = "${key}"`);
//       console.log('filteredLocation',filteredLocation)
//       for (let object of filteredLocation) {
//         console.log('object',object)
//         results.push(object);
//       }
//     });
//     console.log('result',results)
//     resolve(results);
//   }).catch((error) => {
//     reject(error);
//   });
// });

// export const getAllLocation = () => new Promise((resolve, reject) => {
//   Realm.open(databaseOptionsLocation).then(realm => {
//     const data = realm.objects('locationObj');
//     resolve(data);
//   }).catch((error) => {
//     reject(error);
//   });
// });