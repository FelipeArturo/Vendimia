import React, { Component } from 'react';
import { Button,Modal, ModalHeader, ModalBody,ModalFooter,Alert} from 'reactstrap';
import {obtenerRegexPattern,aplicaValidacion,validaStateVsPropObj} from '../../../../Utils/EventosGenerales/EventoGeneral';

class ModalAgregarArticulo extends Component{
    constructor(){
        super();

        this.asignarValorState = this.asignarValorState.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onClickCancelarModal = this.onClickCancelarModal.bind(this);
        this.onClickGuardarArticulo = this.onClickGuardarArticulo.bind(this);

        this.validarInformacion = this.validarInformacion.bind(this);
        this.mostrarControlMensaje = this.mostrarControlMensaje.bind(this);
        this.generaValidacionControles = this.generaValidacionControles.bind(this);

        this.state={}
        this.state.objArticulo={
            id:0,
            clavearticulo:'',
            descripcion:'',
            modelo:'',
            precio:0,
            existencia:0
        };
        this.state.showMensaje={
            colorHeader:'',
            mensajeBody:'',
        };
        this.state.mostarModalMensaje=false;
    }

    /** Metodos que se ejecutaran antes de renderizar la vista o despues de renderizar la vista */
    componentWillMount(){
        this.asignarValorState('id',this.props.objArticulo.id,'objArticulo');
        if(this.props.objArticulo.clavearticulo === ''){
            this.asignarValorState('clavearticulo',this.props.claveArticulo,'objArticulo');
        }else{
            this.asignarValorState('clavearticulo',this.props.objArticulo.clavearticulo,'objArticulo');
        }        
        this.asignarValorState('descripcion',this.props.objArticulo.descripcion,'objArticulo');
        this.asignarValorState('modelo',this.props.objArticulo.modelo,'objArticulo');
        this.asignarValorState('precio',this.props.objArticulo.precio,'objArticulo');
        this.asignarValorState('existencia',this.props.objArticulo.existencia,'objArticulo');
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

    /** Metodos para los onclicks */
    onClickCancelarModal(){
        this.props.onClickCancelar();
    }

    onClickGuardarArticulo(){
        /** Se llama el metodo que validara la informacion */
        if(this.validarInformacion()){
            this.props.onClickGuardar(this.state.objArticulo);   
        }
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
            if(propiedad === 'descripcion' || propiedad === 'modelo'){
                valorPattern = obtenerRegexPattern("nombres");
            }else{
                if(propiedad === 'precio'){
                    valorPattern = obtenerRegexPattern("precio");
                }else{
                    valorPattern = obtenerRegexPattern("numero");
                }
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
            if(this.state.objArticulo.id === 0){
                /** Se realizara un guardado */
                return true;
            }else{
                /** Se llama el metodo que se encargara de indicar si se modifico algo o no */
                if(validaStateVsPropObj(this.state.objArticulo,this.props.objArticulo,'articulos')){
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
        validacion = aplicaValidacion("txtDescripcion",this.state.objArticulo.descripcion,false);
        validacion = aplicaValidacion("txtModelo",this.state.objArticulo.modelo,false);
        validacion = aplicaValidacion("txtPrecio",this.state.objArticulo.precio,true);
        validacion = aplicaValidacion("txtExistencia",this.state.objArticulo.existencia,true);
        return validacion;
    }

    render(){
        return(
            <Modal isOpen={this.props.showModalAddArticulo} >
                {this.state.objArticulo.id === 0
                    ?
                        <ModalHeader className="bg-primary justify-content-center">Nuevo Articulo</ModalHeader>
                    :
                        <ModalHeader className="bg-primary justify-content-center">Editar Articulo</ModalHeader>
                }
                <ModalBody>
                    <div className="row mt-3">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="float-xs-right float-sm-right float-md-right">
                                <div className="input-group">
                                    <div className="input-group-prepend" >
                                        <span className="input-group-text text-primary">
                                            Clave: {this.state.objArticulo.clavearticulo}
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
                                        Descripción &nbsp; &nbsp;&nbsp;
                                    </span>
                                </div>
                                <input type="text" id="txtDescripcion" className="form-control" 
                                       onChange={(e) => this.onChange(e.target,'descripcion','objArticulo')} 
                                       value = {this.state.objArticulo.descripcion} maxLength={50} autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="input-group">
                                <div className="input-group-prepend" >
                                    <span className="input-group-text">
                                        Modelo
                                    </span>
                                </div>
                                <input type="text" id="txtModelo" className="form-control" 
                                       onChange={(e) => this.onChange(e.target,'modelo','objArticulo')} 
                                       value = {this.state.objArticulo.modelo} maxLength={20} autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="input-group">
                                <div className="input-group-prepend" >
                                    <span className="input-group-text">
                                        Precio
                                    </span>
                                </div>
                                <input type="text" id="txtPrecio" className="form-control" 
                                       onChange={(e) => this.onChange(e.target,'precio','objArticulo')} 
                                       value = {this.state.objArticulo.precio} maxLength={10} autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="input-group">
                                <div className="input-group-prepend" >
                                    <span className="input-group-text">
                                        Existencia
                                    </span>
                                </div>
                                <input type="text" id="txtExistencia" className="form-control" 
                                       onChange={(e) => this.onChange(e.target,'existencia','objArticulo')} 
                                       value = {this.state.objArticulo.existencia} maxLength={3} autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.onClickCancelarModal}>Cancelar</Button>
                    <Button id="btnGuardar" color="primary" onClick={this.onClickGuardarArticulo}>Guardar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalAgregarArticulo;