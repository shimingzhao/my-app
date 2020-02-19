import React from "react";
import "./App.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: "Make",
          field: "make",
          rowGroup: true
        },
        {
          headerName: "Price",
          field: "price"
        }
      ],
      autoGroupColumnDef: {
        headerName: "Model",
        field: "model",
        cellRenderer: "agGroupCellRenderer",
        cellRendererParams: {
          checkbox: true
        }
      }
    };
  }

  componentDidMount() {
    fetch("https://api.myjson.com/bins/ly7d1")
      .then(result => result.json())
      .then(rowData => this.setState({ rowData }));
  }

  onButtonClick = e => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData
      .map(node => node.make + " " + node.model)
      .join(", ");
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "400px", width: "600px" }}
      >
        <button onClick={this.onButtonClick}>Get selected rows</button>
        <AgGridReact
          columnDefs={this.state.columnDefs}
          groupSelectsChildren={true}
          autoGroupColumnDef={this.state.autoGroupColumnDef}
          rowData={this.state.rowData}
          rowSelection="multiple"
          onGridReady={params => (this.gridApi = params.api)}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
