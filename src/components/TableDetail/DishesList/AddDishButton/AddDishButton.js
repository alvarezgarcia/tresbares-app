import React from 'react';
import { FABButton, Icon } from 'react-mdl';

function AddDishButton({dishId, addDishFn}) {

  return (
    <FABButton onClick={() => addDishFn(dishId)}>
      <Icon name="add" />
    </FABButton>
  );
}

export default AddDishButton;
