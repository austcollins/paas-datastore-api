'use strict';

// todo: the namespace should be in a config file
const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore({ namespace: 'namespace1' });

function key(id) {
  return datastore.key(['strings', id]);
}

module.exports.list = async () => {
  let [data] = await datastore.createQuery('strings').select('name').order('name').run();
  data = data.map((val) => val.name);
  return (data === undefined || data.length == 0) ? 0 : data; 
};

module.exports.get = async (id) => {
  const [data] = await datastore.get(key(id));
  return (data === undefined || data.length == 0) ? 0 : data.val; 
};

module.exports.put = (id, val) => {
  return datastore.save({ key: key(id), data: { name: id, val } });
};