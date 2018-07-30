import React from 'react';

import { Grid } from 'react-mdl';

import Table from './../Table/Table';

function TablesList(props) {
  return (
    <div style={{width: '100%', margin: 'auto'}}>
      <Grid>
        {
          props.tables.map((tableInfo, i) => {
            return (<Table key={i} info={tableInfo} fnOperateTable={props.fnOperateTable} />);
          })
        }
      </Grid>
    </div>
  );
}

export default TablesList;
