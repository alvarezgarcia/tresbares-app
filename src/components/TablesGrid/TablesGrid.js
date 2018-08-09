import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import TablesList from './TablesList/TablesList';
import ConfirmCloseTable from './ConfirmCloseTable/ConfirmCloseTable';

import { table } from './../../utils/api';

// El componente TablesGrid se encarga de mostrar la grilla inicial de mesas, debido a
// que tiene que mantener el listado de las mismas entre otras variables, este componente
// es un componente "inteligente" porque lleva consigo estado y ejecuta operaciones (en contraposición
// de un componente "tonto" que solo recibe une estado y lo renderiza, sin poder hacer nada con él)
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

  // 1) Si un componente tiene este método, se ejecutará en cuanto el componente se "monte"
  // que sería algo así como justo después de cargarse pero antes de mostrarse.
  // Se usa generalmente para conseguir la información que se va a usar para mostrar, en
  // este caso se busca la información de todas las mesas a través de la función table.getAll
  //
  // 2) Cualquier función que tenga delante de su nombre async puede hacer uso de una de las cualidades
  // más cómodas de las últimas versiones de Javascript, a continuación un ejemplo:
  //
  // async funcionDePrueba() {
  //   const valores = await traerValoresRemotos();
  //   console.log(valores);
  // }
  //
  // Lo novedoso aca es el uso de await, que permite "poner en pausa" hasta que traerValoresRemotos se termine de ejecutar.
  // Para poder usar await es obligatorio poner async antes de la funcion que englobara este llamado
  //
  // En el caso de componentDidMount se usa await para esperar que la API devuelva el valor de todas las mesas.
  // Como también se puede ver, toda la función está envuelta en una construcción llamada try/catch.
  // Esto sirve por si algo falla, por ejemplo la API no responde o responde mal no tener que chequear el valor de allTables
  // sino que internamente se dispara un error y la ejecución "salta" al bloque catch donde, por lo pronto solo lo estoy mostrando
  // al error.
  //
  // 3) Esta función llama a this.setState, esto es propio de React y parte de su corazón, cada vez que se llama a this.setState
  // con algún valor (en este caso tables con lo devuelto por la API), la ejecución se interrumpe y salta directamente al método
  // render que está casi al final.
  // Ésto permite que cada vez que uno ejecute this.setState se actualice lo que se está mostrando.
  // Engancha con este concepto lo que hay al final, el setInterval, ésto lo que está haciendo es cada un segundo establecer en el
  // estado actual el mismo estado que antes, esto permite que el tiempo que cada mesa lleva abierto se actualice para el cliente.
  //
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

  // Si este método está definido, se ejecutará automáticamente cuando el componente se desmonta, generalmente al cambiar de página
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  // Este método lo definí yo para poder operar con las mesas, ésto es cerrarlas, abrirlas, etc.
  // Depende el status enviado, se actualiza el estado con this.setState.
  // Esta función se manda a cada mesa, específicamente para que se use cuando se clickee el switch
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

  // Este método es obligatorio en cada componente "inteligente" y en este caso está haciendo algo llamado
  // "conditional rendering" ésto es o mostrar una cosa u otra, como ves hay un if ternario del estilo
  // var javi = club === 'river' ? 'Vamos River' : 'Morite Boca'; 
  //
  // Este if funciona así, si club es 'river' pondrá 'Vamos River' en javi, sino pondrá 'Morite Boca'
  //
  // En este caso si el estado (representado en this.state) tiene la variable redirectToClosedTable con
  // algún valor redireccionará a la ruta /resumen/:numeroDeMesa (el componente que responde a esta ruta
  // está definido en Main.js), en caso contrario renderizará un <div> con otros dos componentes dentro
  // ConfirmCloseTable y TablesList
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
