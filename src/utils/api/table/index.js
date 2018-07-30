import config from './../../../config';

const {TRESBARES_API_URL} = config;

const path = 'table';

async function getAll() {
  const tables = await fetch(`${TRESBARES_API_URL}/${path}`);
  return tables.json();
}

async function open(tableId) {
  const opts = {
    method: 'POST'
  };

  return await fetch(`${TRESBARES_API_URL}/${path}/${tableId}/open`, opts);
}

async function close(tableId) {
  const opts = {
    method: 'POST'
  };

  return await fetch(`${TRESBARES_API_URL}/${path}/${tableId}/close`, opts);
}

export {
  getAll,
  open,
  close
};
