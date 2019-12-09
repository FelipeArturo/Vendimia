import React, { Component } from 'react';
import { Button,Modal, ModalHeader, ModalBody,ModalFooter,Alert} from 'reactstrap';
import {obtenerRegexPattern,aplicaValidacion,validaStateVsPropObj} from '../../../../Utils/EventosGenerales/EventoGeneral';

class ModalAgregarCliente extends Component{
    constructor(){
        super();

        this.asignarValorState = this.asignarValorState.bind(this);

        this.onClickCancelarModal = this.onClickCancelarModal.bind(this);
        this.onClickGuardarCliente = this.onClickGuardarCliente.bind(this);

        this.onChange = this.onChange.bind(this);

        this.validarInformacion = this.validarInformacion.bind(this);
        this.generaValidacionControles = this.generaValidacionControles.bind(this);
        this.mostrarControlMensaje = this.mostrarControlMensaje.bind(this);

        this.state={}
        this.state.objetoCliente={
            id:0,
            clavecliente:'',
            nombre:'',
            appaterno:'',
            apmaterno:'',
            rfc:''
        };
        this.state.showMensaje={
            colorHeader:'',
            mensajeBody:'',
        };
        this.state.mostarModalMensaje=false;
    }

    /** Metodos que se ejecutaran antes de renderizar la vista o despues de renderizar la vista */
    componentWillMount(){
        this.asignarValorState('id',this.props.objCliente.id,'objetoCliente');
        if(this.props.objCliente.clavecliente === ''){
            this.asignarValorState('clavecliente',this.props.claveCliente,'objetoCliente');
        }else{
            this.asignarValorState('clavecliente',this.props.objCliente.clavecliente,'objetoCliente');
        }        
        this.asignarValorState('nombre',this.props.objCliente.nombre,'objetoCliente');
        this.asignarValorState('appaterno',this.props.objCliente.appaterno,'objetoCliente');
        this.asignarValorState('apmaterno',this.props.objCliente.apmaterno,'objetoCliente');
        this.asignarValorState('rfc',this.props.objCliente.rfc,'objetoCliente');
    }

    /** Metodos para los onclicks */
    onClickCancelarModal(){
        this.props.onClickCancelar();
    }

    onClickGuardarCliente(){
        /** Se llama el metodo que validara la informacion */
        if(this.validarInformacion()){
            this.props.onClickGuardar(this.state.objetoCliente);   
        }
    }

    /** Metodo para asignar los valores al state */
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
            if(propiedad === 'rfc'){
                valorPattern = obtenerRegexPattern("texto");
            }else{
                valorPattern = obtenerRegexPattern("nombres");
            }

            /** Se realiza el match para eliminar caracteres no permitidos */
            if(target.value.match(valorPattern)){
                document.getElementById(target.id).value = target.value.replace(valorPattern,'');
            }
        }

        /** Se asigna el valor al state */
        this.asignarValorState(propiedad,target.value,objeto);
    }

    /** Metodo que permitira realizar la validacion de la informacion */
    validarInformacion(){
        /** valida la informacion de los txt */
        if(this.generaValidacionControles() === 0){
            /** Se valida si se realizara un guardado o una actualizacion */
            if(this.state.objetoCliente.id === 0){
                /** Se realizara un guardado */
                return true;
            }else{
                /** Se llama el metodo que se encargara de indicar si se modifico algo o no */
                if(validaStateVsPropObj(this.state.objetoCliente,this.props.objCliente,'clientes')){
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
        validacion = aplicaValidacion("txtNombre",this.state.objetoCliente.nombre,false);
        validacion = aplicaValidacion("txtApPaterno",this.state.objetoCliente.appaterno,false);
        validacion = aplicaValidacion("txtApMaterno",this.state.objetoCliente.apmaterno,false);
        validacion = aplicaValidacion("txtRFC",this.state.objetoCliente.rfc,false);
        return validacion;
    }

    render(){

        return(
            <Modal isOpen={this.props.showModalAddCliente} >
                {this.state.objetoCliente.id === 0
                    ?
                        <ModalHeader className="bg-primary justify-content-center">Nuevo Cliente</ModalHeader>
                    :
                        <ModalHeader className="bg-primary justify-content-center">Editar Cliente</ModalHeader>
                }
                <ModalBody>
                    <div className="row mt-3">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="float-xs-right float-sm-right float-md-right">
                                <div className="input-group">
                                    <div className="input-group-prepend" >
                                        <span className="input-group-text text-primary">
                                            Clave: {this.state.objetoCliente.clavecliente}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Alert color={this.state.showMensaje.colorHeader} isOpen={this.state.mostarModalMensaje}>
                            {this.state.showMensaje.mensajeBody}
                        </Alert>
                    </div>
                    <div className="row mt-3">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="input-group">
                                <div className="input-group-prepend" >
                                    <span className="input-group-text">
                                        Nombre &nbsp; &nbsp;&nbsp;
                                    </span>
                                </div>
                                <input type="text" id="txtNombre" className="form-control" maxLength={30} 
                                       onChange={(e) => this.onChange(e.target,'nombre','objetoCliente')} 
                                       value = {this.state.objetoCliente.nombre} autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="input-group">
                                <div className="input-group-prepend" >
                                    <span className="input-group-text">
                                        Apellido Paterno
                                    </span>
                                </div>
                                <input type="text" id="txtApPaterno" className="form-control"  maxLength={20} 
                                       onChange={(e) => this.onChange(e.target,'appaterno','objetoCliente')} 
                                       value = {this.state.objetoCliente.appaterno} autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="input-group">
                                <div className="input-group-prepend" >
                                    <span className="input-group-text">
                                        Apellido Materno
                                    </span>
                                </div>
                                <input type="text" id="txtApMaterno" className="form-control" maxLength={20} 
                                       onChange={(e) => this.onChange(e.target,'apmaterno','objetoCliente')} 
                                       value = {this.state.objetoCliente.apmaterno} autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="input-group">
                                <div className="input-group-prepend" >
                                    <span className="input-group-text">
                                        RFC
                                    </span>
                                </div>
                                <input type="text" id="txtRFC" className="form-control" maxLength={20} 
                                       onChange={(e) => this.onChange(e.target,'rfc','objetoCliente')} 
                                       value = {this.state.objetoCliente.rfc} autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.onClickCancelarModal}>Cancelar</Button>
                    <Button id="btnGuardar" color="primary" onClick={this.onClickGuardarCliente}>Guardar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalAgregarCliente;