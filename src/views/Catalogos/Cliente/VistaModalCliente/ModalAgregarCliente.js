import React, { Component } from 'react';
import { Button,Modal, ModalHeader, ModalBody,ModalFooter,Alert} from 'reactstrap';

class ModalAgregarCliente extends Component{
    constructor(){
        super();

        this.state={}
        this.state.ObjetoCliente={
            id:0,
            clavecliente:'',
            nombre:'',
            appaterno:'',
            apmaterno:'',
            rfc:''
        }
    }

    render(){

        return(
            <Modal isOpen={this.props.modalAgregarFormula} >
                {this.state.ObjetoCliente.id === 0
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
                                <input type="text" id="txtNombre" className="form-control" maxLength={50} autoComplete="off"/>
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
                                <input type="text" id="txtApPaterno" className="form-control"  maxLength={50} autoComplete="off"/>
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
                                <input type="text" id="txtApMaterno" className="form-control"  maxLength={50} autoComplete="off"/>
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
                                <input type="text" id="txtRFC" className="form-control"  maxLength={50} autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button id="btnGuardar" color="primary" >Guardar</Button>
                    <Button color="danger" >Cancelar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalAgregarCliente;