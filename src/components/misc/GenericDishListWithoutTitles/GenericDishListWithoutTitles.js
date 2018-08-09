import React from 'react';
import { DataTable, TableHeader } from 'react-mdl';

function GenericDishListWithoutTitles({list}) {
  const totalPrice = list.map(e => e.price).reduce((acc, p) => acc + p, 0);

  return (
		<DataTable style={{width: "100%"}} shadow={0} rows={list}>
			<TableHeader name="name"><h5>Total</h5></TableHeader>
			<TableHeader numeric name="price" cellFormatter={(price) => `$ ${price.toFixed(2)}`}><h5>$ {totalPrice}</h5></TableHeader>
			<TableHeader name="operation"></TableHeader>
		</DataTable>
  );
}

export default GenericDishListWithoutTitles;
