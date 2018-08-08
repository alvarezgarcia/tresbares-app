import React from 'react';

import GenericDishList from './../../misc/GenericDishList/GenericDishList';

function prepareDishesForList({list: dishes}) {
	const list = dishes.map(d => {
		return {
			name: d.name,
			price: d.price,
			// operation: <RemoveDishButton servedId={d.idServed} removeDishFn={removeDishFn} />
			operation: null
		};
	});

	return list;
}

function SummaryList(props) {
	const list = prepareDishesForList(props);

	return (
    <div>
      <GenericDishList list={list} />
    </div>
  );
}

export default SummaryList;
