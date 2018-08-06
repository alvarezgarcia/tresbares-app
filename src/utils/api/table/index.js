import config from './../../../config';

const {TRESBARES_API_URL} = config;

const path = 'table';

async function addDish(tableId, dish) {
	const dishToAdd = {
		idServed: dish.idServed,
		name: dish.name,
		price: dish.price
	};

	const opts = {
		method: 'POST',
		headers: {'Content-Type':'application/json'},
		body: JSON.stringify(dishToAdd)
	};

	const dishAddedRaw = await fetch(`${TRESBARES_API_URL}/${path}/${tableId}/dish`, opts);
	return await dishAddedRaw.json();
}

async function removeDish(tableId, idServed) {
	const opts = {
		method: 'DELETE'
	};

	return await fetch(`${TRESBARES_API_URL}/${path}/${tableId}/dish/${idServed}`, opts);
}

async function getAll() {
  const tables = await fetch(`${TRESBARES_API_URL}/${path}`);
  return tables.json();
}

async function get(tableId) {
  const table = await fetch(`${TRESBARES_API_URL}/${path}/${tableId}`);
  return table.json();
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
  addDish,
  removeDish,
  getAll,
  get,
  open,
  close
};
