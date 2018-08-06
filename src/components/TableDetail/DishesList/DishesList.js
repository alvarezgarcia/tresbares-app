import React from 'react';
import { DataTable, TableHeader, FABButton, Icon } from 'react-mdl';

import AddDishButton from './AddDishButton/AddDishButton';

function prepareDishesForList({dishes, addDishFn}) {

	const list = dishes.map(d => {
		return {
			name: d.name,
			price: d.price,
			operation: <AddDishButton dishId={d._id} addDishFn={addDishFn} />
		};
	});

	return list;
}


function DishesList(props) {

	const list = prepareDishesForList(props);

  return (
		<DataTable style={{width: "100%"}} shadow={0} rows={list}>
			<TableHeader name="name">Nombre</TableHeader>
			<TableHeader numeric name="price" cellFormatter={(price) => `$ ${price.toFixed(2)}`}>Precio</TableHeader>
			<TableHeader name="operation"></TableHeader>
		</DataTable>
  );

}

export default DishesList;
