import React from 'react';
import { DataTable, TableHeader } from 'react-mdl';

function GenericDishList({list}) {

  return (
		<DataTable style={{width: "100%"}} shadow={0} rows={list}>
			<TableHeader name="name">Nombre</TableHeader>
			<TableHeader numeric name="price" cellFormatter={(price) => `$ ${price.toFixed(2)}`}>Precio</TableHeader>
			<TableHeader name="operation"></TableHeader>
		</DataTable>
  );
}

export default GenericDishList;
