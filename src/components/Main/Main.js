import React, { Component } from 'react';
import { Switch, NavLink, Route, Redirect } from 'react-router-dom';
import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl';

import TablesGrid from './../TablesGrid/TablesGrid';
import TableDetail from './../TableDetail/TableDetail';

class Main extends Component {
  render() {
    return (
      <Layout fixedHeader fixedDrawer>
        <Header title="Tres Bares"></Header>

        <Drawer title="Panel de Control">
          <Navigation>
            <NavLink to="/grilla">Mesas</NavLink>
          </Navigation>
        </Drawer>

        <Content>
          <Switch>
            <Route path="/grilla" render={ () => <TablesGrid /> }/>
            <Route path="/detalle/:tableId" render={ (props) => <TableDetail tableId={props.match.params.tableId} /> }/>

            <Redirect to="/grilla" />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default Main;
