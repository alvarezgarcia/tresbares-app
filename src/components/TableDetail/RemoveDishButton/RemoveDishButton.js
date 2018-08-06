import React from 'react';
import { FABButton, Icon } from 'react-mdl';

function RemoveDishButton({dishId, removeDishFn}) {

  return (
    <FABButton onClick={() => removeDishFn(dishId)}>
      <Icon name="clear" />
    </FABButton>
  );
}

export default RemoveDishButton;
