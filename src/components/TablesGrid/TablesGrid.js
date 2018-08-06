import React, { Component } from 'react';

import TablesList from './TablesList/TablesList';

import { table } from './../../utils/api';

class TablesGrid extends Component {
  constructor() {
    super();

    this.state = {};
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
      this.setState({tables: this.state.tables})
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  async operateTable(tableId, status) {
    try {
      if (status === 'open') {
        await table.open(tableId);
      } else if (status === 'close') {
        await table.close(tableId);
      }

      const allTables = await table.getAll();
      this.setState({tables: allTables})
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <TablesList tables={this.state.tables} fnOperateTable={this.operateTable} />
    )
  }
}

export default TablesGrid;
