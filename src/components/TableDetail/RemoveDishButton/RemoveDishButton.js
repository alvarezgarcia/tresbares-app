import React from 'react';
import { FABButton, Icon } from 'react-mdl';

function RemoveDishButton({servedId, removeDishFn}) {

  return (
    <FABButton onClick={() => removeDishFn(servedId)}>
      <Icon name="clear" />
    </FABButton>
  );
}

export default RemoveDishButton;
