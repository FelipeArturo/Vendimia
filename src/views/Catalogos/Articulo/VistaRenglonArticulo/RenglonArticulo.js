import React, { Component } from 'react';

class RenglonArticulo extends Component{

    constructor(){
        super();

        this.onClickEditar = this.onClickEditar.bind(this);
    }

    /** Mertodos que se ejecutaran al realizar click sobre los botones */
    onClickEditar(){
        this.props.clickEditar(this.props.articulo);
    }

    render(){
        return(
            <tr>
                <td>
                    <label>{this.props.articulo.clavearticulo}</label>
                </td>
                <td>
                    <label>{this.props.articulo.descripcion}</label>
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
export default RenglonArticulo;