import React from 'react';
import {Switch} from 'react-mdl';

function TBSwitch(props) {
  const status = props.info.open ? 'ask-to-close' : 'open';
  const checked = props.info.open ? true : false;

  return (
    <Switch checked={checked} onChange={() => props.onChange(props.info._id, status)}/>
  );
}

export default TBSwitch;
