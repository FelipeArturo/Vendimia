import React, { Component } from 'react';
import { Button} from 'reactstrap';
import Globales from '../../../Utils/Globales';
import VistaAgregarVenta from '../VistaAgregarVenta/VistaAgregarVenta';
import VistaTablaVentas from '../VistaTablaVentas/VistaTablaVentas';
import ViewSeparador from '../../Generales/ViewSeparador/ViewSeparador';

class ContenedorVentas extends Component{
    constructor(){
        super();

        this.asignarValorState = this.asignarValorState.bind(this);
        this.ocultarDesocultarVentanas = this.ocultarDesocultarVentanas.bind(this);

        this.onClickAddVenta = this.onClickAddVenta.bind(this);
        this.onClickCancelar = this.onClickCancelar.bind(this);
        this.onClickGuardar = this.onClickGuardar.bind(this);

        this.obtenerListadoCientes = this.obtenerListadoCientes.bind(this);
        this.obtenerListadoArticulos = this.obtenerListadoArticulos.bind(this);
        this.obtenerConfiguracionRegistrada = this.obtenerConfiguracionRegistrada.bind(this);

        this.state={}
        this.state.showModales={
            ventanaTablaVentas:true,
            ventanaAgregarVenta:false
        };
        this.state.configuracion={
            tasafinanciamiento:0,
            porcientoenganche:0,
            plazomaximo:0
        };
        this.state.listadoClientes=[];
        this.state.listadoArticulos=[];
    }

    /** Metodos que se ejecutaran antes y despues de que la vista se renderize */
    componentWillMount(){
        /** Se ejecuta el metodo que obtendra la configuracion registrada */
        this.obtenerConfiguracionRegistrada();
    }

    componentDidMount(){
        /** Se llama el metodo que obtendra el listado de clientes y articulos */
        this.obtenerListadoCientes();
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

    /** Metodo que se usara para poder ocultar y desocultar la ventana */
    ocultarDesocultarVentanas(valorVentVista,valorVentAddVenta){
        /** Primer valor para ocultar o desocultar la ventana de vista tabla */
        this.asignarValorState('ventanaTablaVentas',valorVentVista,'showModales');
        /** Segundo valor para  ocultar o desocultar la ventana de agregar venta*/
        this.asignarValorState('ventanaAgregarVenta',valorVentAddVenta,'showModales');
    }

    /** Metodos que se ejecutaran al dar click en los botones */
    onClickAddVenta(){
        /** Se oculta y desoculta las ventanas */
        this.ocultarDesocultarVentanas(false,true);
        /** Se oculta el boton de nueva venta */
        //document.getElementById("divBotonVenta").style.display="none";
    }

    onClickCancelar(){
        /** Se oculta y desoculta las ventanas */
        this.ocultarDesocultarVentanas(true,false);
        /** se habilita el boton de venta */
        //document.getElementById("divBotonVenta").style.display="inline";
    }

    onClickGuardar(){
        /** Se oculta y desoculta las ventanas */
        this.ocultarDesocultarVentanas(true,false);
        /** Se habilita el boton de nueva venta */
        //document.getElementById("divBotonVenta").style.display="inline";
    }

    /** Metodos que realizaran peticiones al backend */
    obtenerListadoCientes(){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Clientes/getAllClientesMapper',{
            method:'GET',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(Respuesta => {
            /** Se asigna la informacion del modal para ocultarlo */
            //this.asignarValorState('mensaje','','modalCargando');
            //this.asignarValorState('mostrarModal',false,'modalCargando');
            /** Se asigna el listado al state */
            this.setState({
                listadoClientes:Respuesta.listadoClientesMapeados
            })
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
            //this.asignarValorState('mensaje','','modalCargando');
            //this.asignarValorState('mostrarModal',false,'modalCargando');
            /** Se asigna el listado al state */
            this.setState({
                listadoArticulos:Respuesta.listadoArticulos
            })
        })
    }

    obtenerConfiguracionRegistrada(){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Configuracion/getConfiguracion',{
            method:'GET',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(Respuesta => {
            //console.log(Respuesta);
            /** validacion para determinar si existe una configuracion registrada */
            if(Respuesta.objConfiguracion !== null){
                /** Se asigna la informacion al state */
                this.asignarValorState('tasafinanciamiento',Respuesta.objConfiguracion.tasafinanciamiento,'configuracion');
                this.asignarValorState('porcientoenganche',Respuesta.objConfiguracion.porcientoenganche,'configuracion');
                this.asignarValorState('plazomaximo',Respuesta.objConfiguracion.plazomaximo,'configuracion');
            }
        })
    }

    render(){

        let ventanaTablaVentas;
        let ventanaAddVenta;

        /** Validacion para poder crear la ventana de tabla de ventas */
        if(this.state.showModales.ventanaTablaVentas === true){
            ventanaTablaVentas = <div className="animated fadeIn">
                <VistaTablaVentas 
                    onClickAddVentaVentana = {this.onClickAddVenta}
                />
            </div>
        }else{
            ventanaTablaVentas = <div className="animated fadeIn"></div>
        }

        /** Validacion para poder crear la ventana de agregar venta */
        if(this.state.showModales.ventanaAgregarVenta === true){
            ventanaAddVenta = <div className="animated fadeIn">
                <VistaAgregarVenta 
                    listadoClientes = {this.state.listadoClientes}
                    listadoArticulos = {this.state.listadoArticulos}
                    objConfiguracion = {this.state.configuracion}
                    onClickCancelarVenta = {this.onClickCancelar}
                    onClickEventoAfterSave = {this.onClickGuardar}
                />
            </div>
        }else{
            ventanaAddVenta = <div className="animated fadeIn"></div>
        }

        return(
            <div className="container-fluid">
                <div>
                    {ventanaTablaVentas}
                    {ventanaAddVenta}
                </div>
            </div>
        )
    }
}

export default ContenedorVentas;