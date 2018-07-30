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
      <Link to={`/detalle/${props.info.tableNumber}`}><Chip>+</Chip></Link>
    </CardTitle>
  )

}

/*
const CabeceraTarjeta = ({abrirMesaFn, abierta, abiertaCuando, mesaNro, opsMesa, agregarProducto}) => (
  <CardTitle style={{backgroundColor: '#fafafa', height: '50px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
    <SwitchAbrir abrirMesaFn={abrirMesaFn} abierta={abierta} abiertaCuando={abiertaCuando} mesaNro={mesaNro} opsMesa={opsMesa} />
    {
      abierta ?
      <Link to={`/detalle/${mesaNro}`}><Chip>Mesa {mesaNro} (<i>{construirFecha(abiertaCuando)}</i>)</Chip></Link> :
      <Chip>Mesa {mesaNro}</Chip>
    }
    {
      abierta ?
      <Link to={`/agregar/${mesaNro}`}><Chip onClick={agregarProducto}>+</Chip></Link>:
      null
    }
  </CardTitle>
);
*/

export default TBCardHeader;
