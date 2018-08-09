import React, { Component } from 'react';
import moment from 'moment';

import { Grid, Cell } from 'react-mdl';

import { dish, table } from './../../utils/api';

import DishesList from './DishesList/DishesList';
import ServedList from './ServedList/ServedList';
import TBFlexibleCard from './../misc/TBFlexibleCard/TBFlexibleCard';

class TableDetail extends Component {
  constructor(props) {
    super();
    
    this.state = {};
    this.state.dishes = [];
    this.state.table = {};

		this.addDishToTable = this.addDishToTable.bind(this);
		this.removeDishFromTable = this.removeDishFromTable.bind(this);
  }

  async componentDidMount() {
    try {
      const requests = [
        table.get(this.props.tableId),
        dish.getAll()
      ];

      const [tableInfo, allDishes] = await Promise.all(requests);
      this.setState({table: tableInfo, dishes: allDishes})
    } catch (err) {
      console.log(err);
    }
  }

	async addDishToTable(dishId) {
		const dish = this.state.dishes.find(dish => dish._id === dishId)

    const idServedBasedOnTimestamp = moment().valueOf();
    const updatedDish = Object.assign({}, dish, {idServed: idServedBasedOnTimestamp});

		try {
			const dishAdded = await table.addDish(this.state.table._id, updatedDish);

      const {table: tableToUpdate} = this.state;
      const {served} = tableToUpdate;

      const tableUpdated = Object.assign({}, tableToUpdate, {served: served.concat(dishAdded)});

      this.setState({table: tableUpdated});
		} catch (err) {
      console.log(err);
		}
	}

  async removeDishFromTable(idServed) {
    try {
      await table.removeDish(this.state.table._id, idServed);

      const {table: tableToUpdate} = this.state;
      const {served} = tableToUpdate;

      const servedUpdate = served.filter(s => s.idServed !== idServed);
      const tableUpdated = Object.assign({}, tableToUpdate, {served: servedUpdate});

      this.setState({table: tableUpdated});
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
              <div>
                <TBFlexibleCard title="Productos"/>
                <br />
                <DishesList dishes={this.state.dishes} addDishFn={this.addDishToTable} />
              </div>
            }
          </Cell>
          <Cell col={6}>
            {
              this.state.dishes.length === 0 ?
              <div>Loading</div>:
              <div>
                <TBFlexibleCard title="Servidos"/>
                <br />
                <ServedList dishes={this.state.table.served} removeDishFn={this.removeDishFromTable} />
              </div>
            }
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default TableDetail;
