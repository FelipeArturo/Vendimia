import React, { Component } from 'react';
import { Button,Alert} from 'reactstrap';
import Globales from '../../../../Utils/Globales';

import ModalAddCliente from '../VistaModalCliente/ModalAgregarCliente';

class TablaCliente extends Component{
    constructor(){
        super();

        this.asignarValorState = this.asignarValorState.bind(this);

        this.onClickAgregarCliente = this.onClickAgregarCliente.bind(this);
        this.onClickCancelarCliente = this.onClickCancelarCliente.bind(this);
        this.onClickGuardarCliente = this.onClickGuardarCliente.bind(this);

        this.guardarCliente = this.guardarCliente.bind(this);

        this.state={}
        this.state.showModales={
            ventanaShowModal:false
        }
        this.state.objCliente = {
            id:0,
            clavecliente:'',
            nombre:'',
            appaterno:'',
            apmaterno:'',
            rfc:''
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

    onClickGuardarCliente(objetoCliente){
        if(objetoCliente.id === 0){
            this.guardarCliente(objetoCliente);
        }
    }

    /** Metodo que realizaran peticiones al api */
    guardarCliente(objetoCliente){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Clientes/guardarCliente',{
            method:'POST',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            },body:JSON.stringify(objetoCliente)
        })
        .then(res => res.json())
        .then(Respuesta => {
            console.log(Respuesta);
        })
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
                    onClickGuardar = {this.onClickGuardarCliente}
                    objCliente = {this.state.objCliente}
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