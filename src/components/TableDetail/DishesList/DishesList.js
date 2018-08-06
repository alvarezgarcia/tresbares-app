import React from 'react';
import { DataTable, TableHeader, FABButton, Icon } from 'react-mdl';

import GenericDishList from './../../misc/GenericDishList/GenericDishList';
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

	return <GenericDishList list={list} />;
}

export default DishesList;
