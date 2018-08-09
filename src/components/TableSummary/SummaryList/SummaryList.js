import React from 'react';

import GenericDishListWithoutTitles from './../../misc/GenericDishListWithoutTitles/GenericDishListWithoutTitles';

function prepareDishesForList({list: dishes}) {
	const list = dishes.map(d => {
		return {
			name: d.name,
			price: d.price,
			operation: null
		};
	});

	return list;
}

function SummaryList(props) {
	const list = prepareDishesForList(props);

	return (
    <div>
      <GenericDishListWithoutTitles list={list} />
    </div>
  );
}

export default SummaryList;
