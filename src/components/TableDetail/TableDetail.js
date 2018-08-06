import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';

import { dish, table } from './../../utils/api';

import DishesList from './DishesList/DishesList';

class TableDetail extends Component {
  constructor(props) {
    super();
    
    this.state = {};
    this.state.dishes = [];
    this.state.table = {};

		this.addDishToTable = this.addDishToTable.bind(this);
  }

  async componentDidMount() {
    try {
      const requests = [
        table.get(this.props.tableId),
        dish.getAll()
      ];

      const [tableInfo, allDishes] = await Promise.all(requests);
      this.setState({dishes: allDishes})
    } catch (err) {
      console.log(err);
    }
  }

	async addDishToTable(dishId) {
		const dish = this.state.dishes.find(dish => dish._id === dishId)

		try {
			const dishAdded = await table.addDish(this.props.tableId, dish);
			console.log('DA', dishAdded);
		} catch (err) {
      console.log(err);
		}
	}

  render() {
    return (
      <div style={{width: '100%', margin: 'auto'}}>
        <Grid>
          <Cell col={6}>
            {
              this.state.dishes.length === 0 ?
              <div>Loading</div>:
              <DishesList dishes={this.state.dishes} addDishFn={this.addDishToTable} />
            }
          </Cell>
          <Cell col={6}>
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default TableDetail;
