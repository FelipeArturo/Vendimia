import React, { Component } from 'react';
import { Button,Alert} from 'reactstrap';
import Globales from '../../../../Utils/Globales';

import ModalAddArticulo from '../VistaModalArticulo/ModalAgregarArticulo';
import RenglonArticulo from '../VistaRenglonArticulo/RenglonArticulo';
import ModalCargando from '../../../Generales/ModalCargando/ModalCargando';
import ViewSeparador from '../../../Generales/ViewSeparador/ViewSeparador';

class TablaArticulo extends Component{

    constructor(){
        super();

        this.asignarValorState = this.asignarValorState.bind(this);
        this.llenarValoresStates = this.llenarValoresStates.bind(this);
        this.limpiarStateObjeto = this.limpiarStateObjeto.bind(this);
        this.mostrarControlMensaje = this.mostrarControlMensaje.bind(this);
    
        this.onClickAgregarArticulo = this.onClickAgregarArticulo.bind(this);
        this.onClickCancelarArticulo = this.onClickCancelarArticulo.bind(this);
        this.onClickGuardarArticulo = this.onClickGuardarArticulo.bind(this);
        this.onClickEditarArticulo = this.onClickEditarArticulo.bind(this);

        this.guardarArticulo = this.guardarArticulo.bind(this);
        this.obtenerConteoArticulos = this.obtenerConteoArticulos.bind(this);
        this.actualizarArticulo = this.actualizarArticulo.bind(this);
        this.obtenerListadoArticulos = this.obtenerListadoArticulos.bind(this);
        this.guardarArticulo = this.guardarArticulo.bind(this);

        this.state={}
        this.state.showModales={
            ventanaShowModal:false
        }
        this.state.objArticulo = {
            id:0,
            clavearticulo:'',
            descripcion:'',
            modelo:'',
            precio:0,
            existencia:0
        };
        this.state.variablesVista={
            clavearticulo:''
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
        this.state.listadoArticulos = [];
    }

    /** Metodos que se ejecutaran al renderizarse la vista o antes */
    componentDidMount(){
        this.obtenerConteoArticulos();
        /** Se asigna la informacion del modal para visualizarlo */
        this.asignarValorState('mensaje','Cargando','modalCargando');
        this.asignarValorState('mostrarModal',true,'modalCargando');
        /** Se llama el metodo que obtendra la lista de clientes */
        this.obtenerListadoArticulos();
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
    onClickAgregarArticulo(){
        /** Se realiza el cambio del state para el modal de agregar cliente */
        this.asignarValorState('ventanaShowModal',true,'showModales');
    }

    onClickCancelarArticulo(){
        /** Se realiza el cambio del state para el modal de agregar cliente */
        this.asignarValorState('ventanaShowModal',false,'showModales');
        /** Se limpia el state */
        this.limpiarStateObjeto();
    }

    onClickGuardarArticulo(objetoArticulo){
        /** Se cierra el modal de guardar */
        this.asignarValorState('ventanaShowModal',false,'showModales');
        /** Validacion para determinar si es nuevo o actualizacion */
        if(objetoArticulo.id === 0){
            /** Se asignan los valores al modal de cargando */
            this.asignarValorState('mensaje','Guardando','modalCargando');
            this.asignarValorState('mostrarModal',true,'modalCargando');
            /** Se llama el metodo que guardara el articulo */
            this.guardarArticulo(objetoArticulo);
        }else{
            /** Se asignan los valores al modal de cargando */
            this.asignarValorState('mensaje','Actualizando','modalCargando');
            this.asignarValorState('mostrarModal',true,'modalCargando');
            /** Se llama el metodo que actualizara el articulo */
            this.actualizarArticulo(objetoArticulo);
        }
    }

    onClickEditarArticulo(objetoArticulo){
        /** Se asignan las propiedades al objeto state */
        this.llenarValoresStates(objetoArticulo);
        /** Se visualiza la ventana del modal */
        this.asignarValorState('ventanaShowModal',true,'showModales');
    }

    /** Metodo que realizaran peticiones al api */
    guardarArticulo(objetoArticulo){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Articulos/guardarArticulo',{
            method:'POST',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            },body:JSON.stringify(objetoArticulo)
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
                this.obtenerConteoArticulos();
                /** Se llama el metodo que obtendra el listado de los clientes */
                this.obtenerListadoArticulos();
            }else{
                this.mostrarControlMensaje(Respuesta.objetoStatus.mensajeError,'danger','showMensaje');
            }
        })
    }

    obtenerListadoArticulos(){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Articulos/getAllArticulos',{
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
                listadoArticulos:Respuesta.listadoArticulos
            })
        })
    }

    actualizarArticulo(objetoArticulo){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Articulos/actualizarArticulo',{
            method:'POST',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            },body:JSON.stringify(objetoArticulo)
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
                this.obtenerListadoArticulos();
            }else{
                this.mostrarControlMensaje(Respuesta.objetoStatus.mensajeError,'danger','showMensaje');
            }
        })
    }

    /** Metodos que se ejecutaran para realizar peticiones al api */
    obtenerConteoArticulos(){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Articulos/countArticulos',{
            method:'GET',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(Respuesta => {
            /** Se asigna el conteo */
            this.asignarValorState('clavearticulo',Respuesta.conteoClave,'variablesVista');
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
        this.asignarValorState('id',0,'objArticulo');
        this.asignarValorState('clavearticulo','','objArticulo');
        this.asignarValorState('descripcion','','objArticulo');
        this.asignarValorState('modelo','','objArticulo');
        this.asignarValorState('precio',0,'objArticulo');
        this.asignarValorState('existencia',0,'objArticulo');
    }

    /** Metodo que se encargara de asignar los valores al state */
    llenarValoresStates(objArticulo){
        this.asignarValorState('id',objArticulo.id,'objArticulo');
        this.asignarValorState('clavearticulo',objArticulo.clavearticulo,'objArticulo');
        this.asignarValorState('descripcion',objArticulo.descripcion,'objArticulo');
        this.asignarValorState('modelo',objArticulo.modelo,'objArticulo');
        this.asignarValorState('precio',objArticulo.precio,'objArticulo');
        this.asignarValorState('existencia',objArticulo.existencia,'objArticulo');
    }

    render(){
        /** Variables donde se asignara el modal */
        let mostarModalAddArticulo;
        let mostrarModalCargando;
        /** Validacion para determinar si se crea el objeto para mostrar el modal o no */
        if(this.state.showModales.ventanaShowModal === true){
            mostarModalAddArticulo = <div className="animated fade-In">
                <ModalAddArticulo
                    showModalAddArticulo = {this.state.showModales.ventanaShowModal}
                    objArticulo = {this.state.objArticulo}
                    claveArticulo = {this.state.variablesVista.clavearticulo}
                    onClickCancelar = {this.onClickCancelarArticulo}
                    onClickGuardar = {this.onClickGuardarArticulo}
                />
            </div>
        }else{
            mostarModalAddArticulo = <div className="animated fade-In">
            </div>
        }

        if(this.state.modalCargando.mostrarModal === true){
            mostrarModalCargando = <div className="animated fade-In">
                <ModalCargando
                    modalCargando = {this.state.modalCargando.mostrarModal}
                    mensaje = {this.state.modalCargando.mensaje}
                />
            </div>
        }else{
            mostrarModalCargando = <div className="animated fade-In"></div>
        }

        return(
            <div className="container-fluid">
                <div>
                    {mostarModalAddArticulo}
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
                            titulo = "Articulos Registrados"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="float-xs-right float-sm-right float-md-right">
                            <Button color="primary" onClick={this.onClickAgregarArticulo}>
                                <i className="fa fa-plus mr-1"> </i>Nuevo Articulo
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <table className="table table-bordered table-sm table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Clave Articulo</th>
                                    <th>Descripción</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listadoArticulos.map((e) =>
                                    <RenglonArticulo
                                        articulo = {e}
                                        clickEditar = {this.onClickEditarArticulo}
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
export default TablaArticulo;