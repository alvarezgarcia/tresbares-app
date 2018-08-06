import React from 'react';
 import moment from 'moment';
import { Link } from 'react-router-dom';
import { CardTitle, Chip } from 'react-mdl';

import TBSwitch from './../../TBSwitch/TBSwitch';

const esLocale = require('moment/locale/es');

function buildHumanDate(date) {
  moment.locale('es', esLocale);
  return moment(date).fromNow();
}

function TBCardHeader(props) {
  return(
    <CardTitle style={{backgroundColor: '#fafafa', height: '50px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
      <TBSwitch info={props.info} onChange={props.fnOperateTable} />
      {
        props.info.open ?
        <Chip>Mesa {props.info.tableNumber} (<i>{buildHumanDate(props.info.openAt)}</i>)</Chip> :
        <Chip>Mesa {props.info.tableNumber}</Chip>
      }
      {
        props.info.open ?
        <Link to={`/detalle/${props.info._id}`}><Chip>+</Chip></Link> :
        null
      }
    </CardTitle>
  )
}

export default TBCardHeader;
