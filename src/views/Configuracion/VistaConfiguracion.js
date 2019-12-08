import React, { Component } from 'react';
import { Button,Alert} from 'reactstrap';
import {obtenerRegexPattern,validaStateVsPropObj,aplicaValidacion} from '../../Utils/EventosGenerales/EventoGeneral';
import ModalCargando from '../Generales/ModalCargando/ModalCargando';
import ViewSeparador from '../Generales/ViewSeparador/ViewSeparador';
import Globales from '../../Utils/Globales';

class VistaConfiguracion extends Component{
    constructor(){
        super();

        this.asignarValorState = this.asignarValorState.bind(this);
        this.limpiarStateValues = this.limpiarStateValues.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onClickGuardar = this.onClickGuardar.bind(this);
        this.onClickEditar = this.onClickEditar.bind(this);
        this.onClickCancelar = this.onClickCancelar.bind(this);

        this.obtieneConfiguracion = this.obtieneConfiguracion.bind(this);
        this.guardarConfiguracion = this.guardarConfiguracion.bind(this);
        this.actualizarConfiguracion = this.actualizarConfiguracion.bind(this);

        this.mostrarControlMensaje = this.mostrarControlMensaje.bind(this);
        this.generaValidacionControles = this.generaValidacionControles.bind(this);
        this.validarInformacion = this.validarInformacion.bind(this);

        this.state={}
        this.state.objConfiguracion={
            id:0,
            tasafinanciamiento:0,
            porcientoenganche:0,
            plazomaximo:0
        };
        this.state.objConfEditar = {
            id:0,
            tasafinanciamiento:0,
            porcientoenganche:0,
            plazomaximo:0
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
    }

    /** Metodos que se ejecutaran antes y despues de que se renderiza la vista */
    componentWillMount(){
        /** Se llama el metodo que obtendra la informacion de configuracion */
        this.obtieneConfiguracion();
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

    /** Metodos para los onchange de los inputs */
    onChange(target,propiedad,objeto){
        /** Eliminar el espacio en blanco solo */
        if(target.value.trim() === '' || target.value.trim() === null){
            if(target.value.trim() === ''){
                document.getElementById(target.id).value = target.value.replace(' ','');
            }

            /** Se asigna el color rojo para indicar que esta mal */
            target.style.borderColor = 'red';
        }else{
            let valorPattern;
            /** Se asigna el color default para indicar que esta bien */
            target.style.borderColor = '#E8E8E8';

            /** Se valida para determinar que pattern de validacion se obtendra */
            if(propiedad === 'tasafinanciamiento'){
                valorPattern = obtenerRegexPattern("precio");
            }else{
                valorPattern = obtenerRegexPattern("numero");
            }

            /** Se realiza el match para eliminar caracteres no permitidos */
            if(target.value.match(valorPattern)){
                document.getElementById(target.id).value = target.value.replace(valorPattern,'');
            }
        }

        /** Se asigna el valor al state */
        this.asignarValorState(propiedad,target.value,objeto);
    }

    /** Metodo para poder realizar la validacion de la informacion */
    validarInformacion(){
        if(this.generaValidacionControles() === 0){
            /** Se valida si se realizara un guardado o una actualizacion */
            if(this.state.objConfiguracion.id === 0){
                /** Se realizara un guardado */
                return true;
            }else{
                /** Se llama el metodo que se encargara de indicar si se modifico algo o no */
                if(validaStateVsPropObj(this.state.objConfiguracion,this.state.objConfEditar,'configuracion')){
                    return true;
                }else{
                    /** Se asignan los valores del mensaje */
                    this.mostrarControlMensaje("Se debe modificar al menos un campo para poder actualizar.", 'danger', 'showMensaje');
                    /** Se regresa el valor de que no cumplio la condicion */
                    return false;
                }
            }
        }else{
            this.mostrarControlMensaje("Debe proporcionar toda la información.", 'danger', 'showMensaje');
            /** Se regresa el valor de que no cumplio la condicion */
            return false;
        }
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

    /** Metodo que se ejecutara para poder indicar que campo esta mal */
    generaValidacionControles(){
        let validacion = 0;
        validacion = aplicaValidacion("txtTFinanciamiento",this.state.objConfiguracion.tasafinanciamiento,true);
        validacion = aplicaValidacion("txtEnganche",this.state.objConfiguracion.porcientoenganche,true);
        validacion = aplicaValidacion("txtPlazoMaximo",this.state.objConfiguracion.plazomaximo,true);
        return validacion;
    }

    /** Metodos que se ejecutaran al realizar click en los botones */
    onClickGuardar(){
        if(this.validarInformacion()){
            /** Se valida para determinar si se realiza un registro nuevo o actualizacion */
            if(this.state.objConfiguracion.id === 0){
                /** Se asigna el mensaje de carga */
                this.asignarValorState('mensaje','Guardando','modalCargando');
                this.asignarValorState('mostrarModal',true,'modalCargando');
                /** Se realiza el guardado de la informacion */
                this.guardarConfiguracion();
            }else{
                /** Se asigna el mensaje de carga */
                this.asignarValorState('mensaje','Actualizando','modalCargando');
                this.asignarValorState('mostrarModal',true,'modalCargando');
                /** Se realiza la actualizacion de la informacion */
                this.actualizarConfiguracion();
            }
        }
    }

    onClickEditar(){
        /** Se deshabilitan lso inputs */
        this.deshabilitarHabilitarInputs(false);
        /** deshabilita los botones */
        this.displayNoneInlineButton('Editar');
    }

    onClickCancelar(){
        /** Se valida si el state tiene informacion o no */
        if(this.state.objConfiguracion.id > 0){
            /** Se deshabilitan lso inputs */
            this.deshabilitarHabilitarInputs(true);
            /** Se habilitan los botones necesarios */
            this.displayNoneInlineButton('Guardar');
        }else{
            /** Se limpian los states */
            this.limpiarStateValues();
        }
    }

    /** Metodo que realizan acciones en la vista */
    deshabilitarHabilitarInputs(valor){
        /** Se deshabilitan o habilitan los inputs */
        document.getElementById("txtTFinanciamiento").disabled = valor;
        document.getElementById("txtEnganche").disabled = valor;
        document.getElementById("txtPlazoMaximo").disabled = valor;
    }

    /** Metodo que se encargara de ocultar los botones */
    displayNoneInlineButton(accion){
        /** Se valida si se obtuvo informacion o no */
        if(this.state.objConfiguracion.id > 0){
            /** se valida si se esta realizando un guardado o edicion */
            if(accion === 'Guardar'){
                document.getElementById("btnGuardar").style.display = "none";
                document.getElementById("btnEditar").style.display = "inline";
            }else{
                document.getElementById("btnGuardar").style.display = "inline";
                document.getElementById("btnEditar").style.display = "none";
            }
        }
    }

    /** Metodo para limpiar los valores de las propiedades del state */
    limpiarStateValues(){
        this.asignarValorState('tasafinanciamiento',0,'objConfiguracion');
        this.asignarValorState('porcientoenganche',0,'objConfiguracion');
        this.asignarValorState('plazomaximo',0,'objConfiguracion');
    }

    /** Metodo que ejecutaran peticiones al api */
    obtieneConfiguracion(){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Configuracion/getConfiguracion',{
            method:'GET',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(Respuesta => {
            /** Validacion para determinar si trae informacion el objeto o no */
            if(Respuesta.objConfiguracion !== null){
                console.log(Respuesta);
                /** Se asignan los valores al state normal */
                this.asignarValorState('id',Respuesta.objConfiguracion.id,'objConfiguracion');
                this.asignarValorState('tasafinanciamiento',Respuesta.objConfiguracion.tasafinanciamiento,'objConfiguracion');
                this.asignarValorState('porcientoenganche',Respuesta.objConfiguracion.porcientoenganche,'objConfiguracion');
                this.asignarValorState('plazomaximo',Respuesta.objConfiguracion.plazomaximo,'objConfiguracion');
                /** Se asignan los valores al state de editar */
                this.asignarValorState('id',Respuesta.objConfiguracion.id,'objConfEditar');
                this.asignarValorState('tasafinanciamiento',Respuesta.objConfiguracion.tasafinanciamiento,'objConfEditar');
                this.asignarValorState('porcientoenganche',Respuesta.objConfiguracion.porcientoenganche,'objConfEditar');
                this.asignarValorState('plazomaximo',Respuesta.objConfiguracion.plazomaximo,'objConfEditar');
                /** Se llama el metodo que deshabilita el boton */
                this.displayNoneInlineButton('Guardar');
                /** Se llama el metodo que deshabilita los inputs */
                this.deshabilitarHabilitarInputs(true);
            }
        })
    }

    guardarConfiguracion(){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Configuracion/guardarConfiguracion',{
            method:'POST',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            },body:JSON.stringify(this.state.objConfiguracion)
        })
        .then(res => res.json())
        .then(Respuesta => {
            console.log(Respuesta);
            /** Se asigna la informacion del modal para ocultarlo */
            this.asignarValorState('mensaje','','modalCargando');
            this.asignarValorState('mostrarModal',false,'modalCargando');
            /** Se muestra el mensaje de guardando */
            this.mostrarControlMensaje(Respuesta.objetoStatus.mensajeError,'success','showMensaje');
            /** Se llama el metodo que obtendra la informacion del registro */
            this.obtieneConfiguracion();
        })
    }

    actualizarConfiguracion(){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Configuracion/actualizarConfiguracion',{
            method:'POST',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            },body:JSON.stringify(this.state.objConfiguracion)
        })
        .then(res => res.json())
        .then(Respuesta => {
            console.log(Respuesta);
            /** Se asigna la informacion del modal para ocultarlo */
            this.asignarValorState('mensaje','','modalCargando');
            this.asignarValorState('mostrarModal',false,'modalCargando');
            /** Se muestra el mensaje de guardando */
            this.mostrarControlMensaje(Respuesta.objetoStatus.mensajeError,'success','showMensaje');
            /** Se llama el metodo que obtendra la informacion del registro */
            this.obtieneConfiguracion();
        })
    }

    render(){
        let mostrarModalCargando;
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
                            titulo = "Configuración General"
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="input-group">
                            <div className="input-group-prepend" >
                                <span className="input-group-text">
                                    Tasa Financiamiento
                                </span>
                            </div>
                            <input type="text" id="txtTFinanciamiento" className="form-control" maxLength={5}
                                   onChange={(e) => this.onChange(e.target,'tasafinanciamiento','objConfiguracion')}
                                   value={this.state.objConfiguracion.tasafinanciamiento} autoComplete="off"/>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="input-group">
                            <div className="input-group-prepend" >
                                <span className="input-group-text">
                                    % Enganche
                                </span>
                            </div>
                            <input type="text" id="txtEnganche" className="form-control" maxLength={3} 
                                   onChange={(e) => this.onChange(e.target,'porcientoenganche','objConfiguracion')}
                                   value={this.state.objConfiguracion.porcientoenganche} autoComplete="off"/>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="input-group">
                            <div className="input-group-prepend" >
                                <span className="input-group-text">
                                    Plazo Máximo
                                </span>
                            </div>
                            <input type="text" id="txtPlazoMaximo" className="form-control" maxLength={3}
                                   onChange={(e) => this.onChange(e.target,'plazomaximo','objConfiguracion')}
                                   value={this.state.objConfiguracion.plazomaximo} autoComplete="off"/>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="float-md-right">
                            <Button id="btnCancelar" className="mr-1" onClick={this.onClickCancelar} color="danger">
                                Cancelar
                            </Button>
                            {this.state.objConfiguracion.id === 0 
                                ?
                                    <Button id="btnGuardar" onClick={this.onClickGuardar} color="primary">
                                        Guardar
                                    </Button>
                                :
                                    <React.Fragment>
                                        <Button id="btnGuardar" onClick={this.onClickGuardar} color="primary">
                                            Guardar
                                        </Button>
                                        <Button id="btnEditar" onClick={this.onClickEditar} color="success">
                                            Editar
                                        </Button>
                                    </React.Fragment>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VistaConfiguracion;