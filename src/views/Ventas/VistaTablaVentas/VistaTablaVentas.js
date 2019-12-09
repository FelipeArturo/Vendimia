import React, { Component } from 'react';
import RenglonVentas from '../RenglonVentas/RenglonVentas';
import Globales from '../../../Utils/Globales';

class VistaTablaVentas extends Component{
    constructor(){
        super();

        this.obtenerListadoVentas = this.obtenerListadoVentas.bind(this);

        this.state={};
        this.state.listadoVentas=[];
    }

    componentDidMount(){
        /** Se llama el metodo que obtendra el listao de ventas */
        this.obtenerListadoVentas();
    }

    obtenerListadoVentas(){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Ventas/getAllVentas',{
            method:'GET',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(Respuesta => {
            /** Se asigna el listado al state */
            this.setState({
                listadoVentas:Respuesta.listadoVentas
            })
        })
    }

    render(){
        return(
            <div className="row mt-1">
                <div className="col-xs-12 col-sm-12 col-md-12">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Folio Venta</th>
                                <th>Clave Cliente</th>
                                <th>Nombre</th>
                                <th>Total</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listadoVentas.map((e) =>
                                <RenglonVentas
                                    venta = {e}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default VistaTablaVentas;