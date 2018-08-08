import React, { Component } from 'react';

import { table } from './../../utils/api';

import SummaryList from './SummaryList/SummaryList';

class TableSummary extends Component {
  constructor() {
    super();

    this.state = {};
  }

  async componentDidMount() {
    try {
      const tableInfo = await table.get(this.props.tableId);
      this.setState({table: tableInfo})
    } catch (err) {
      console.log(err);
    }
  }

  render () {
    return (
      this.state.table ?
      <SummaryList list={this.state.table.served} /> :
      null
    );
  }
}

export default TableSummary;
