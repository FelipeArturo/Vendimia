import React, { Component } from 'react';
import { Button,Alert} from 'reactstrap';
import Globales from '../../../../Utils/Globales';

import ModalAddCliente from '../VistaModalCliente/ModalAgregarCliente';
import RenglonCliente from '../VistaRenglonCliente/RenglonCliente';
import ModalCargando from '../../../Generales/ModalCargando/ModalCargando';
import ViewSeparador from '../../../Generales/ViewSeparador/ViewSeparador';

class TablaCliente extends Component{
    constructor(){
        super();

        this.asignarValorState = this.asignarValorState.bind(this);
        this.llenarValoresStates = this.llenarValoresStates.bind(this);
        this.limpiarStateObjeto = this.limpiarStateObjeto.bind(this);

        this.onClickAgregarCliente = this.onClickAgregarCliente.bind(this);
        this.onClickCancelarCliente = this.onClickCancelarCliente.bind(this);
        this.onClickGuardarCliente = this.onClickGuardarCliente.bind(this);
        this.onClickEditarCliente = this.onClickEditarCliente.bind(this);

        this.guardarCliente = this.guardarCliente.bind(this);
        this.obtenerListadoClientes = this.obtenerListadoClientes.bind(this);
        this.obtenerConteoClientes = this.obtenerConteoClientes.bind(this);
        this.actualizarCliente = this.actualizarCliente.bind(this);

        this.mostrarControlMensaje = this.mostrarControlMensaje.bind(this);

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
        };
        this.state.variablesVista={
            clavecliente:''
        }
        this.state.modalCargando = {
            mostrarModal:false,
            mensaje:''
        };
        this.state.showMensaje = {
            colorHeader:'',
            mensajeBody:'',
        };
        this.state.mostarModalMensaje = false;
        this.state.listadoClientes = [];
    }

    /** Metodos que se ejecutaran al renderizarse la vista o antes */
    componentDidMount(){
        this.obtenerConteoClientes();
        /** Se asigna la informacion del modal para visualizarlo */
        this.asignarValorState('mensaje','Cargando','modalCargando');
        this.asignarValorState('mostrarModal',true,'modalCargando');
        /** Se llama el metodo que obtendra la lista de clientes */
        this.obtenerListadoClientes();
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
        /** Se limpia el state */
        this.limpiarStateObjeto();
    }

    onClickGuardarCliente(objetoCliente){
        /** Se cierra el modal de guardar */
        this.asignarValorState('ventanaShowModal',false,'showModales');
        /** Validacion para determinar si es nuevo o actualizacion */
        if(objetoCliente.id === 0){
            /** Se asignan los valores al modal de cargando */
            this.asignarValorState('mensaje','Guardando','modalCargando');
            this.asignarValorState('mostrarModal',true,'modalCargando');
            /** Se llama el metodo que guardara el cliente */
            this.guardarCliente(objetoCliente);
        }else{
            /** Se asignan los valores al modal de cargando */
            this.asignarValorState('mensaje','Actualizando','modalCargando');
            this.asignarValorState('mostrarModal',true,'modalCargando');
            /** Se llama el metodo que actualizara el cliente */
            this.actualizarCliente(objetoCliente);
        }
    }

    onClickEditarCliente(objCliente){
        /** Se asignan las propiedades al objeto state */
        this.llenarValoresStates(objCliente);
        /** Se visualiza la ventana del modal */
        this.asignarValorState('ventanaShowModal',true,'showModales');
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
            /** Se limpia el state */
            this.limpiarStateObjeto();
            /** Se asigna la informacion del modal para ocultarlo */
            this.asignarValorState('mensaje','','modalCargando');
            this.asignarValorState('mostrarModal',false,'modalCargando');
            /** Se valida para determinar si se realizo el guardado correctamnte o no */
            if(Respuesta.objetoStatus.codigoError.split(" ")[0] === "201"){
                this.mostrarControlMensaje(Respuesta.objetoStatus.mensajeError,'success','showMensaje');
                /** Se llama el metodo que se encarga de obtener el total de registros */
                this.obtenerConteoClientes();
                /** Se llama el metodo que obtendra el listado de los clientes */
                this.obtenerListadoClientes();
            }else{
                this.mostrarControlMensaje(Respuesta.objetoStatus.mensajeError,'danger','showMensaje');
            }
        })
    }

    obtenerListadoClientes(){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Clientes/getAllClientes',{
            method:'GET',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(Respuesta => {
            /** Se asigna la informacion del modal para ocultarlo */
            this.asignarValorState('mensaje','','modalCargando');
            this.asignarValorState('mostrarModal',false,'modalCargando');
            /** Se asigna el listado al state */
            this.setState({
                listadoClientes:Respuesta.listadoClientes
            })
        })
    }

    actualizarCliente(objetoCliente){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Clientes/actualizarCliente',{
            method:'POST',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            },body:JSON.stringify(objetoCliente)
        })
        .then(res => res.json())
        .then(Respuesta => {
            /** Se limpia el state */
            this.limpiarStateObjeto();
            /** Se asigna la informacion del modal para ocultarlo */
            this.asignarValorState('mensaje','','modalCargando');
            this.asignarValorState('mostrarModal',false,'modalCargando');
            /** Se valida para determinar si se realizo el guardado correctamnte o no */
            if(Respuesta.objetoStatus.codigoError.split(" ")[0] === "201"){
                this.mostrarControlMensaje(Respuesta.objetoStatus.mensajeError,'success','showMensaje');
                /** Se llama el metodo que obtendra el listado de los clientes */
                this.obtenerListadoClientes();
            }else{
                this.mostrarControlMensaje(Respuesta.objetoStatus.mensajeError,'danger','showMensaje');
            }
        })
    }

    /** Metodos que se ejecutaran para realizar peticiones al api */
    obtenerConteoClientes(){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Clientes/countClientes',{
            method:'GET',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(Respuesta => {
            /** Se asigna el conteo */
            this.asignarValorState('clavecliente',Respuesta.conteoClave,'variablesVista');
            //console.log(this.state.variablesVista);
        })
    }

    /** Metodo que se encargara de mostrar el mensaje */
    mostrarControlMensaje(mensaje,opcion,objeto){
        //Se regresa como verdadero si cumplio con las validaciones
        this.asignarValorState('colorHeader', opcion, objeto);
        this.asignarValorState('mensajeBody', mensaje, objeto);
        //Se muestra el mensaje de error adjunto el time out
        this.setState({mostarModalMensaje:true},()=>{
            window.setTimeout(()=>{
                this.setState({mostarModalMensaje:false})
            },3500)
        });
    }

    /** Metodo que se encargara de limpiar el state */
    limpiarStateObjeto(){
        this.asignarValorState('id',0,'objCliente');
        this.asignarValorState('clavecliente','','objCliente');
        this.asignarValorState('nombre','','objCliente');
        this.asignarValorState('appaterno','','objCliente');
        this.asignarValorState('apmaterno','','objCliente');
        this.asignarValorState('rfc','','objCliente');
    }

    /** Metodo que se encargara de asignar los valores al state */
    llenarValoresStates(objCliente){
        this.asignarValorState('id',objCliente.id,'objCliente');
        this.asignarValorState('clavecliente',objCliente.clavecliente,'objCliente');
        this.asignarValorState('nombre',objCliente.nombre,'objCliente');
        this.asignarValorState('appaterno',objCliente.appaterno,'objCliente');
        this.asignarValorState('apmaterno',objCliente.apmaterno,'objCliente');
        this.asignarValorState('rfc',objCliente.rfc,'objCliente');
    }

    render(){
        /** Variables donde se asignara el modal */
        let mostarModalAddCliente;
        let mostrarModalCargando;
        /** Validacion para determinar si se crea el objeto para mostrar el modal o no */
        if(this.state.showModales.ventanaShowModal === true){
            mostarModalAddCliente = <div className="animated fadeIn">
                <ModalAddCliente
                    showModalAddCliente = {this.state.showModales.ventanaShowModal}
                    onClickCancelar = {this.onClickCancelarCliente}
                    onClickGuardar = {this.onClickGuardarCliente}
                    objCliente = {this.state.objCliente}
                    claveCliente = {this.state.variablesVista.clavecliente}
                />
            </div>
        }else{
            mostarModalAddCliente = <div className="animated fadeIn">
            </div>
        }

        if(this.state.modalCargando.mostrarModal === true){
            mostrarModalCargando = <div className="animated fadeIn">
                <ModalCargando
                    modalCargando = {this.state.modalCargando.mostrarModal}
                    mensaje = {this.state.modalCargando.mensaje}
                />
            </div>
        }else{
            mostrarModalCargando = <div className="animated fadeIn"></div>
        }

        return(
            <div className="container-fluid">
                <div>
                    {mostarModalAddCliente}
                    {mostrarModalCargando}
                </div>
                <div>
                    <Alert color={this.state.showMensaje.colorHeader} isOpen={this.state.mostarModalMensaje}>
                        {this.state.showMensaje.mensajeBody}
                    </Alert>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <ViewSeparador 
                            titulo = "Clientes Registrados"
                        />
                    </div>
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
                        <table className="table table-bordered table-sm table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Clave Cliente</th>
                                    <th>Nombre</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listadoClientes.map((e) =>
                                    <RenglonCliente
                                        cliente = {e}
                                        clickEditar = {this.onClickEditarCliente}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default TablaCliente;