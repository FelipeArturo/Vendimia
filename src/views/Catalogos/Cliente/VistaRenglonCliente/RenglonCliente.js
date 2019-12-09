import React, { Component } from 'react';

class RenglonCliente extends Component{

    constructor(){
        super();

        this.onClickEditar = this.onClickEditar.bind(this);
    }

    /** Mertodos que se ejecutaran al realizar click sobre los botones */
    onClickEditar(){
        this.props.clickEditar(this.props.cliente);
    }

    render(){
        return(
            <tr>
                <td>
                    <label>{this.props.cliente.clavecliente}</label>
                </td>
                <td >
                    <label>{this.props.cliente.nombre + " " + this.props.cliente.appaterno + " " + this.props.cliente.apmaterno}</label>
                </td>
                <td>
                    <button className="btn btn-outline-success" onClick={this.onClickEditar}>
                        <i className="fa fa-pencil-square-o fa-sm"></i>
                    </button>
                </td>
            </tr>
        )
    }
}
export default RenglonCliente;