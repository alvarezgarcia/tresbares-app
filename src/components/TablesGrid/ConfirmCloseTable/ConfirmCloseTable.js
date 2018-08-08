import React from 'react';

import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from 'react-mdl';

function ConfirmCloseTable(props) {
	return (
		<Dialog open={props.show}>
			<DialogTitle component='h5'>¿Cerrar mesa?</DialogTitle>
			<DialogContent>
			</DialogContent>
			<DialogActions>
				<Button type='button' onClick={() => props.fnOperateTable(props.tableIdToClose, 'close')}>Cerrar</Button>
				<Button type='button' onClick={() => props.fnOperateTable(props.tableIdToClose, 'ask-to-close-cancel')}>Cancelar</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmCloseTable;
