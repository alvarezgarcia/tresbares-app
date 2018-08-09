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

function TBFlexibleCard(props) {
	return (
		<Card shadow={0} style={{width: '100%', minHeight: '0px'}}>
			<CardTitle style={{width: '100%', overflow: 'auto', padding: '0px 0px 0px 0px'}}>
        <h2>{props.title}</h2>
			</CardTitle>
		</Card>
	);
};

export default TBFlexibleCard;
