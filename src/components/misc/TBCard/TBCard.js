import React from 'react';
import {
	Card,
	CardTitle,
	CardText,
	CardActions,
	CardMenu,
	Button,
	IconButton
} from 'react-mdl';

import TBCardHeader from './TBCardHeader/TBCardHeader';

function TBCard(props) {
	return (
		<Card shadow={0} style={{width: '100%'}}>
      <TBCardHeader info={props.info} fnOperateTable={props.fnOperateTable} />
			<CardText style={{width: '100%', height: '240px', overflow: 'auto', padding: '0px 0px 0px 0px'}}>
        {
          /*
          abierta ?
          <ListaProductos productos={productosServidos}/>:
          null
          */
        }
			</CardText>
		</Card>
	);
};

export default TBCard;
