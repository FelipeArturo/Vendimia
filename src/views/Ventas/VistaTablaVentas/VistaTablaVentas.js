import React, { Component } from 'react';
import RenglonVentas from '../RenglonVentas/RenglonVentas';
import {Card,CardBody,CardHeader,Button} from 'reactstrap';
import Globales from '../../../Utils/Globales';

class VistaTablaVentas extends Component{
    constructor(){
        super();

        this.onClickAddVenta = this.onClickAddVenta.bind(this);
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

    /** Metodos onclick */
    onClickAddVenta(){
        this.props.onClickAddVentaVentana();
    }

    render(){
        return(
            <div className="row mt-5">
                <div className="col-xs-12 col-sm-12 col-md-12">
                    <Card className="rounded">
                        <CardHeader className="bg-primary rounded justify-content-center" style={{marginLeft:"25px",marginRight:"25px",marginTop:"-20px"}}> Ventas Activas </CardHeader>
                        <CardBody>
                            <div className="row mb-1">
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <div className="float-xs-right float-sm-right float-md-right">
                                        <Button color="primary" onClick={this.onClickAddVenta} id="divBotonVenta">
                                            <i className="fa fa-plus mr-1"> </i>Nueva Venta
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-bordered table-sm table-hover">
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
                        </CardBody>
                    </Card>
                </div>
            </div>
        )
    }
}

export default VistaTablaVentas;