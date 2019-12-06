import React, { Component } from 'react';
import { Button,Alert} from 'reactstrap';

import ModalAddCliente from '../VistaModalCliente/ModalAgregarCliente';

class TablaCliente extends Component{
    constructor(){
        super();

        this.asignarValorState = this.asignarValorState.bind(this);

        this.onClickAgregarCliente = this.onClickAgregarCliente.bind(this);
        this.onClickCancelarCliente = this.onClickCancelarCliente.bind(this);

        this.state={}
        this.state.showModales={
            ventanaShowModal:false
        }
    }

    /** Metodo para poder asignar los valores al state */
    asignarValorState(campo,valor,objeto){
        //Se crea el objeto que hara referncia al state
        let Obj = this.state[objeto];
        //Se crea el switch para entrar a las opciones
        Obj[campo] = valor;
        //Se realiza la actualizacion del state
        this.setState({
            objeto:Obj
        })
    }

    /** Metodos para realizar las acciones de los onclicks */
    onClickAgregarCliente(){
        /** Se realiza el cambio del state para el modal de agregar cliente */
        this.asignarValorState('ventanaShowModal',true,'showModales');
    }

    onClickCancelarCliente(){
        /** Se realiza el cambio del state para el modal de agregar cliente */
        this.asignarValorState('ventanaShowModal',false,'showModales');
    }

    onClickGuardarCliente(){

    }

    render(){
        /** Variables donde se asignara el modal */
        let mostarModalAddCliente;
        /** Validacion para determinar si se crea el objeto para mostrar el modal o no */
        if(this.state.showModales.ventanaShowModal === true){
            mostarModalAddCliente = <div className="animated fade-In">
                <ModalAddCliente
                    showModalAddCliente = {this.state.showModales.ventanaShowModal}
                    onClickCancelar = {this.onClickCancelarCliente}
                />
            </div>
        }else{
            mostarModalAddCliente = <div className="animated fade-In">
            </div>
        }

        return(
            <div className="container-fluid">
                <div>
                    {mostarModalAddCliente}
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="float-xs-right float-sm-right float-md-right">
                            <Button color="primary" onClick={this.onClickAgregarCliente}>
                                <i className="fa fa-plus mr-1"> </i>Nuevo Cliente
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <table className="table table-bordered table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Clave Cliente</th>
                                    <th>Nombre</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default TablaCliente;