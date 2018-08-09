import React, { Component } from 'react';
import { Switch, NavLink, Route, Redirect } from 'react-router-dom';
import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl';

import TablesGrid from './../TablesGrid/TablesGrid';
import TableDetail from './../TableDetail/TableDetail';
import TableSummary from './../TableSummary/TableSummary';

// Este componente es el componente principal, muestra el panel lateral, el
// título y, por último el elemento Content, más específicamente su hijo llamado
// Switch es un componente dinámico que dependiendo de la ruta en la barra de direcciones
// muestra diferentes componentes:
// - TablesGrid
// - TableDetail
// - TableSummary
//
// Si por algún motivo se intenta ejecutar otra ruta, por defecto redireciona a /grilla

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
            <Route path="/resumen/:tableId" render={ (props) => <TableSummary tableId={props.match.params.tableId} /> }/>

            <Redirect to="/grilla" />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default Main;
