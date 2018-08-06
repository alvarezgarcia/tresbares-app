import React from 'react';
import { DataTable, TableHeader, FABButton, Icon } from 'react-mdl';

import GenericDishList from './../../misc/GenericDishList/GenericDishList';
import RemoveDishButton from './../RemoveDishButton/RemoveDishButton';

function prepareDishesForList({dishes, removeDishFn}) {
	const list = dishes.map(d => {
		return {
			name: d.name,
			price: d.price,
			operation: <RemoveDishButton servedId={d.idServed} removeDishFn={removeDishFn} />
		};
	});

	return list;
}


function ServedList(props) {
	const list = prepareDishesForList(props);

	return <GenericDishList list={list} />;
}

export default ServedList;
