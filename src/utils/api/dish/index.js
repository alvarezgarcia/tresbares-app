import config from './../../../config';

const {TRESBARES_API_URL} = config;

const path = 'dish';

async function getAll() {
  const tables = await fetch(`${TRESBARES_API_URL}/${path}`);
  return tables.json();
}

export {
  getAll
};
