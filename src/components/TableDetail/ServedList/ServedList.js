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
  const lastRow = {
    name: <b>Total</b>,
    price: list.reduce((acc, d) => acc + d.price, 0),
    operation: null
  };


  const updatedList = list.concat(lastRow);
	return <GenericDishList list={updatedList} />;
}

export default ServedList;
