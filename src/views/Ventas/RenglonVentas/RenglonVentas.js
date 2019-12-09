import React, { Component } from 'react';

class RenglonVentas extends Component{
    render(){
        return(
            <tr>
                <td> <label>{this.props.venta.folioventa}</label></td>
                <td> <label>{this.props.venta.clavecliente}</label></td>
                <td> <label>{this.props.venta.nombre}</label></td>
                <td> <label>{this.props.venta.total}</label></td>
                <td> <label>{this.props.venta.createat}</label></td>
            </tr>
        )
    }
}

export default RenglonVentas;