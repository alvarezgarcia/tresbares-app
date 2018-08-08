import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import TablesList from './TablesList/TablesList';
import ConfirmCloseTable from './ConfirmCloseTable/ConfirmCloseTable';

import { table } from './../../utils/api';

class TablesGrid extends Component {
  constructor() {
    super();

    this.state = {};
		this.state.showCloseConfirmTable = false;
		this.state.redirectToClosedTable = null;
		this.state.tableIdToClose = null;
    this.state.timer = null;
    this.state.tables = [];

    this.operateTable = this.operateTable.bind(this);
  }

  async componentDidMount() {
    try {
      const allTables = await table.getAll();

      const sortedTables = allTables.sort((tp, tc) => tp.tableNumber - tc.tableNumber);
      this.setState({tables: sortedTables})
    } catch (err) {
      console.log(err);
    }

    this.state.timer = setInterval(() => {
      const {tables} = this.state;
      const sortedTables = tables.sort((tp, tc) => tp.tableNumber - tc.tableNumber);

      this.setState({tables: sortedTables})
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  async operateTable(tableId, status) {
		if (status === 'ask-to-close') {
			return this.setState({tableIdToClose: tableId, showCloseConfirmTable: true});
		} else if (status === 'ask-to-close-cancel') {
			return this.setState({showCloseConfirmTable: false});
		}

    try {
			let newState = {};

      if (status === 'open') {
        await table.open(tableId);
      } else if (status === 'close') {
        await table.close(tableId);

				newState.showCloseConfirmTable = false;
				newState.redirectToClosedTable = tableId;
      }

      const allTables = await table.getAll();
      const sortedTables = allTables.sort((tp, tc) => tp.tableNumber - tc.tableNumber);

			newState.tables = sortedTables;

      this.setState(newState)
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
			this.state.redirectToClosedTable ?
			<Redirect to={`/resumen/${this.state.redirectToClosedTable}`} /> :
			<div>
				<ConfirmCloseTable show={this.state.showCloseConfirmTable} tableIdToClose={this.state.tableIdToClose} fnOperateTable={this.operateTable} />
				<TablesList tables={this.state.tables} fnOperateTable={this.operateTable} />
			</div>
    )
  }
}

export default TablesGrid;
