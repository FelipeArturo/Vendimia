import React, { Component } from 'react';
import { Button,Modal, ModalHeader, ModalBody,ModalFooter,Alert} from 'reactstrap';
import {obtenerRegexPattern} from '../../../../Utils/EventosGenerales/EventoGeneral';

class ModalAgregarCliente extends Component{
    constructor(){
        super();

        this.asignarValorState = this.asignarValorState.bind(this);

        this.onClickCancelarModal = this.onClickCancelarModal.bind(this);

        this.onChange = this.onChange.bind(this);

        this.state={}
        this.state.objetoCliente={
            id:0,
            clavecliente:'',
            nombre:'',
            appaterno:'',
            apmaterno:'',
            rfc:''
        }
    }

    /** Metodos para los onclicks */
    onClickCancelarModal(){
        this.props.onClickCancelar();
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

            /** Se asigna el valor al state */
            this.asignarValorState(propiedad,target.value.trim(),objeto);
        }
    }

    render(){

        return(
            <Modal isOpen={this.props.showModalAddCliente} >
                {this.state.objetoCliente.id === 0
                    ?
                        <ModalHeader className="bg-primary">Nuevo Cliente</ModalHeader>
                    :
                        <ModalHeader className="bg-primary">Editar Cliente</ModalHeader>
                }
                <ModalBody>
                    <div>
                       
                    </div>
                    <div>
                        
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
                                       onChange={(e) => this.onChange(e.target,'nombre','objetoCliente')} autoComplete="off"/>
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
                                <input type="text" id="txtApPaterno" className="form-control"  maxLength={20} autoComplete="off"/>
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
                                <input type="text" id="txtApMaterno" className="form-control"  maxLength={20} autoComplete="off"/>
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
                                <input type="text" id="txtRFC" className="form-control"  maxLength={20} autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.onClickCancelarModal}>Cancelar</Button>
                    <Button id="btnGuardar" color="primary" >Guardar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalAgregarCliente;