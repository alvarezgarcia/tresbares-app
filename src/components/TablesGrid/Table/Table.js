import React from 'react';
import {Grid, Cell} from 'react-mdl';

import TBCard from './../../misc/TBCard/TBCard';


function Table(props) {
  return (
    <Cell col={4}>
      <TBCard info={props.info} fnOperateTable={props.fnOperateTable} />
    </Cell>
  );
}

export default Table;
