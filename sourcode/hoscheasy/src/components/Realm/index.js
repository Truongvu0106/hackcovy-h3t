const Realm = require('realm');

const agentObj = {
  name: 'agentObj',
  primaryKey: 'CODE',
  properties: {
    CODE: { type: 'int?', default: 0 },
    PHONE: { type: 'int?', default: 0 },
    CHANNEL_NAME: { type: 'string?', default: '' },
    PROVINCE: { type: 'string?', default: '' },
    DISTRICT: { type: 'string?', default: '' },
    TOWNSHIP: { type: 'string?', default: '' },
    ADDRESS: { type: 'string?', default: '' },
    LATITUDE: { type: 'float?', default: '' },
    LONGITUDE: { type: 'float?', default: '' },
    DISTANCE: { type: 'float?', default: '' },
    RATINGS: { type: 'int?', default: 0 },
    BALANCE: { type: 'string?', default: '' }
  }
};
const agentList = {
  name: 'agentList',
  properties: {
    'object': { type: 'list', objectType: 'agentObj' } },
};

const locationObj = {
  name: 'locationObj',
  primaryKey: 'AREA_CODE',
  properties: {
    AREA_ID: { type: 'int?', default: 0 },
    AREA_CODE: { type: 'string?', default: '' },
    AREA_NAME: { type: 'string?', default: '' },
    PARENT_CODE: { type: 'string?', default: '' },
  }
};

const locationList = {
  name: 'locationList',
  properties: {
    'object': { type: 'list', objectType: 'locationObj' }
  }
};

const databaseOptions = {
  schema: [agentObj, agentList]
};
const databaseOptionsLocation = {
  schema: [locationObj, locationList]
};

export const saveListAgent = (data) => {
  console.log('Data save', data);
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {
        realm.create('agentList', {
          object: data
        });
        console.log('==> Save list agent success');
      });
    })
    .catch(error => {
      console.log('==> Save list agent error', error);
    });
};

export const updateAgent = (agent) => {
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {
        realm.create('agentObj', agent, true);
      });
      console.log('==> Update agent success');
    })
    .catch(error => {
      console.log('==> Update agent false', error);
    });
};

export const updateListAgent = (arrAgent) => {
  Realm.open(databaseOptions)
    .then(realm => {
      arrAgent.forEach(agent => {
        realm.write(() => {
          realm.create('agentObj', agent, true);
        });
        console.log('==> Update list agent success');
      });
    })
    .catch(error => {
      console.log('==> Update list agent false', error);
    });
};

export const getAllAgent = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    const data = realm.objects('agentObj');
    // console.log('Realm data list agent', JSON.stringify(data));
    resolve(JSON.stringify(data));
  }).catch((error) => {
    reject(error);
  });
});

export const paginationListAgent = (currentPage) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    const pageSize = 10;
    const start = pageSize * (currentPage - 1);
    const end = start + pageSize;
    const data = realm.objects('agentObj').slice(start, end);
    console.log('Realm data list agent pagination', JSON.stringify(data));
    resolve(JSON.stringify(data));
  }).catch((error) => {
    reject(error);
  });
});

export const filterAgentByArea = (cluster, district, township) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    const allAgent = realm.objects('agentObj');
    const query = `PROVINCE = "${cluster}" AND DISTRICT = "${district}" AND TOWNSHIP = "${township}"`;
    console.log('Query', query);
    const filteredAgent = allAgent.filtered(query);
    const results = [];
    for (const a of filteredAgent) {
      results.push(a);
    }
    console.log('Data filter', JSON.stringify(results));
    resolve(JSON.stringify(results));
  }).catch((error) => {
    reject(error);
  });
});

export const saveListLocation = (data) => new Promise((resolve, reject) => {
  Realm.open(databaseOptionsLocation).then(realm => {
    realm.write(() => {
      realm.create('locationList', {
        object: data
      });
      resolve('Save list location success');
    });
  }).catch((error) => {
    reject(error);
  });
});

export const updateListLocation = (newData) => new Promise((resolve, reject) => {
  Realm.open(databaseOptionsLocation).then(realm => {
    newData.forEach(location => {
      realm.write(() => {
        realm.create('locationObj', location, true);
      });
    });
    resolve('Update list location success');
  }).catch((error) => {
    reject(error);
  });
});

export const getLisLocationByKey = (key = 'MM') => new Promise((resolve, reject) => {
  Realm.open(databaseOptionsLocation).then(realm => {
    realm.write(() => {
      const filteredLocation = realm.objects('locationObj').filtered(`PARENT_CODE = "${key}"`);
      const results = [];
      for (const object of filteredLocation) {
        results.push(object);
      }
      resolve(JSON.stringify(results));
    });
  }).catch((error) => {
    reject(error);
  });
});
