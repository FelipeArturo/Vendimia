import React, { Component } from 'react';
import { Button,Alert} from 'reactstrap';

class VistaConfiguracion extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="input-group">
                            <div className="input-group-prepend" >
                                <span className="input-group-text">
                                    Tasa Financiamiento:
                                </span>
                            </div>
                            <input type="text" id="txtTFinanciamiento" className="form-control" maxLength={3} autoComplete="off"/>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="input-group">
                            <div className="input-group-prepend" >
                                <span className="input-group-text">
                                    % Enganche:
                                </span>
                            </div>
                            <input type="text" id="txtEnganche" className="form-control" maxLength={3} autoComplete="off"/>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="input-group">
                            <div className="input-group-prepend" >
                                <span className="input-group-text">
                                    Plazo Máximo:
                                </span>
                            </div>
                            <input type="text" id="txtPlazoMaximo" className="form-control" maxLength={3} autoComplete="off"/>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="float-md-right">
                            <Button id="btnGuardar" color="success">
                                Guardar
                            </Button>
                            <Button id="btnCancelar" color="danger">
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VistaConfiguracion;