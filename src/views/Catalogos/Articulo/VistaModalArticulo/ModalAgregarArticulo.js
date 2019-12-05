import React, { Component } from 'react';
import { Button,Modal, ModalHeader, ModalBody,ModalFooter,Alert} from 'reactstrap';

class ModalAgregarCliente extends Component{
    constructor(){
        super();

        this.state={}
        this.state.ObjetoArticulo={
            id:0,
            clavearticulo:'',
            descripcion:'',
            modelo:'',
            precio:0,
            existencia:0
        }
    }

    render(){

        return(
            <Modal isOpen={this.props.modalAgregarFormula} >
                {this.state.ObjetoArticulo.id === ''
                    ?
                        <ModalHeader className="bg-primary">Nuevo Articulo</ModalHeader>
                    :
                        <ModalHeader className="bg-primary">Editar Articulo</ModalHeader>
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
                                        Descripción &nbsp; &nbsp;&nbsp;
                                    </span>
                                </div>
                                <input type="text" id="txtDescripcion" className="form-control" maxLength={50} autoComplete="off"/>
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
                                <input type="text" id="txtModelo" className="form-control"  maxLength={50} autoComplete="off"/>
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
                                <input type="text" id="txtPrecio" className="form-control"  maxLength={50} autoComplete="off"/>
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
                                <input type="text" id="txtExistencia" className="form-control"  maxLength={50} autoComplete="off"/>
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