import React, { Component } from 'react';

class VistaPagosMeses extends Component{
    constructor(){
        super();

        this.asignarValorState = this.asignarValorState.bind(this);

        //this.onClickRadioButton = this.onClickRadioButton.bind(this);

        this.calcularInformacionMeses = this.calcularInformacionMeses.bind(this);
        this.calcularPagosMeses = this.calcularPagosMeses.bind(this);

        this.state={}
        this.state.informacionPagosMeses={
            preciocontado:0,
            totalpagar:0,
            totalpagar3meses:0,
            importeabono3meses:0,
            importeahorro3meses:0,
            totalpagar6meses:0,
            importeabono6meses:0,
            importeahorro6meses:0,
            totalpagar9meses:0,
            importeabono9meses:0,
            importeahorro9meses:0,
            totalpagar12meses:0,
            importeabono12meses:0,
            importeahorro12meses:0,
        }
    }

    /** metodos que se ejecutaran antes y despues de que se renderize la vista */
    componentDidMount(){
        this.calcularInformacionMeses();
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

    /** Metodos que se ejecutaran para poder generar los calculos */
    calcularInformacionMeses(){
        /** Se calcula el valor de precio contado */
        var precioContado = (parseFloat(this.props.objInformacionTotal.total) / (parseInt(1) + ((parseFloat(this.props.objConfiguracion.tasafinanciamiento) * parseFloat(this.props.objConfiguracion.plazomaximo)) / parseInt(100)))).toFixed(2);
        /** Se asigna el valor al state */
        this.asignarValorState('preciocontado',precioContado,'informacionPagosMeses');
        /** Se crean los calculos para cada tipo de pago */
        this.calcularPagosMeses(3,precioContado);
        this.calcularPagosMeses(6,precioContado);
        this.calcularPagosMeses(9,precioContado);
        this.calcularPagosMeses(12,precioContado);
    }

    /** Metodo que calculara dependiendo el mes */
    calcularPagosMeses(totalMeses,precioContado){
        var totalPagar = 0;
        var importeAbono = 0;
        var importeAhorro = 0;
        /** Se realiza la validacion para saber que tipo de calculo se realizara */
        if(parseInt(totalMeses) === parseInt(3)){
            /** Se calcula el total a pagar para 3 meses */
            totalPagar = (parseFloat(precioContado) * (parseInt(1) + ((parseFloat(this.props.objConfiguracion.tasafinanciamiento) * parseInt(3)) / parseInt(100)))).toFixed(2);
            /** Se calcula el importe de abono para 3 meses */
            importeAbono = (parseFloat(totalPagar) / parseInt(3)).toFixed(2);
            /** Se calcula el importe ahorra para 3 meses */
            importeAhorro = (parseFloat(this.props.objInformacionTotal.total) - parseFloat(totalPagar)).toFixed(2);
            /** Se asignan los valores al state */
            this.asignarValorState('totalpagar3meses',totalPagar,'informacionPagosMeses');
            this.asignarValorState('importeabono3meses',importeAbono,'informacionPagosMeses');
            this.asignarValorState('importeahorro3meses',importeAhorro,'informacionPagosMeses');
        }else{
            if(parseInt(totalMeses) === parseInt(6)){
                /** Se calcula el total a pagar para 3 meses */
                totalPagar = (parseFloat(precioContado) * (parseInt(1) + ((parseFloat(this.props.objConfiguracion.tasafinanciamiento) * parseInt(6)) / parseInt(100)))).toFixed(2);
                /** Se calcula el importe de abono para 3 meses */
                importeAbono = (parseFloat(totalPagar) / parseInt(6)).toFixed(2);
                /** Se calcula el importe ahorra para 3 meses */
                importeAhorro = (parseFloat(this.props.objInformacionTotal.total) - parseFloat(totalPagar)).toFixed(2);
                /** Se asignan los valores al state */
                this.asignarValorState('totalpagar6meses',totalPagar,'informacionPagosMeses');
                this.asignarValorState('importeabono6meses',importeAbono,'informacionPagosMeses');
                this.asignarValorState('importeahorro6meses',importeAhorro,'informacionPagosMeses');
            }else{
                if(parseInt(totalMeses) === parseInt(9)){
                    /** Se calcula el total a pagar para 3 meses */
                    totalPagar = (parseFloat(precioContado) * (parseInt(1) + ((parseFloat(this.props.objConfiguracion.tasafinanciamiento) * parseInt(9)) / parseInt(100)))).toFixed(2);
                    /** Se calcula el importe de abono para 3 meses */
                    importeAbono = (parseFloat(totalPagar) / parseInt(9)).toFixed(2);
                    /** Se calcula el importe ahorra para 3 meses */
                    importeAhorro = (parseFloat(this.props.objInformacionTotal.total) - parseFloat(totalPagar)).toFixed(2);
                    /** Se asignan los valores al state */
                    this.asignarValorState('totalpagar9meses',totalPagar,'informacionPagosMeses');
                    this.asignarValorState('importeabono9meses',importeAbono,'informacionPagosMeses');
                    this.asignarValorState('importeahorro9meses',importeAhorro,'informacionPagosMeses');
                }else{
                    /** Se calcula el total a pagar para 3 meses */
                    totalPagar = (parseFloat(precioContado) * (parseInt(1) + ((parseFloat(this.props.objConfiguracion.tasafinanciamiento) * parseInt(12)) / parseInt(100)))).toFixed(2);
                    /** Se calcula el importe de abono para 3 meses */
                    importeAbono = (parseFloat(totalPagar) / parseInt(12)).toFixed(2);
                    /** Se calcula el importe ahorra para 3 meses */
                    importeAhorro = (parseFloat(this.props.objInformacionTotal.total) - parseFloat(totalPagar)).toFixed(2);
                    /** Se asignan los valores al state */
                    this.asignarValorState('totalpagar12meses',totalPagar,'informacionPagosMeses');
                    this.asignarValorState('importeabono12meses',importeAbono,'informacionPagosMeses');
                    this.asignarValorState('importeahorro12meses',importeAhorro,'informacionPagosMeses');
                }
            }
        }
    }

    /** Metodo que se ejecutara al dar click en los radio button */
    onClickRadioButton(){
        /** Se obtiene el valor que se selecciono */
        var radio = document.getElementsByName('example');
        /** Se recorre el arreglo de radio buttons */
        for(var i=0; i<radio.length; i++){
            if(radio[i].checked){
                this.props.onClickRadioButton(radio[i].value);
            }
        }
    }

    render(){
        //ml-4 mt-2
        return(
            <div className="row mt-3">
                <div className="col-xs-12 col-sm-12 col-md-12">
                    <table className="table table-sm table-hover">
                        <thead className="table-secondary justify-content-center">
                            <tr>
                                <th></th>
                                <th></th>
                                <th>ABONOS MENSUALES</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                   <label> 3 ABONOS DE</label> 
                                </td>
                                <td>
                                    <label> $ {this.state.informacionPagosMeses.importeabono3meses}</label>
                                </td>
                                <td>
                                    <label> TOTAL A PAGAR $ {this.state.informacionPagosMeses.totalpagar3meses}</label>
                                </td>
                                <td>
                                    <label>SE AHORRA $ {this.state.informacionPagosMeses.importeahorro3meses}</label>
                                </td>
                                <td>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input" onClick={() => this.onClickRadioButton()} id="customRadio3" name="example" value="3"/>
                                        <label className="custom-control-label" htmlFor="customRadio3"></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   <label> 6 ABONOS DE</label> 
                                </td>
                                <td>
                                    <label> $ {this.state.informacionPagosMeses.importeabono6meses}</label>
                                </td>
                                <td>
                                    <label> TOTAL A PAGAR $ {this.state.informacionPagosMeses.totalpagar6meses}</label>
                                </td>
                                <td>
                                    <label>SE AHORRA $ {this.state.informacionPagosMeses.importeahorro6meses}</label>
                                </td>
                                <td>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input" onClick={() => this.onClickRadioButton()} id="customRadio6" name="example" value="6"/>
                                        <label className="custom-control-label" htmlFor="customRadio6"></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   <label> 9 ABONOS DE</label> 
                                </td>
                                <td>
                                    <label> $ {this.state.informacionPagosMeses.importeabono9meses}</label>
                                </td>
                                <td>
                                    <label> TOTAL A PAGAR $ {this.state.informacionPagosMeses.totalpagar9meses}</label>
                                </td>
                                <td>
                                    <label>SE AHORRA $ {this.state.informacionPagosMeses.importeahorro9meses}</label>
                                </td>
                                <td>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input" onClick={() => this.onClickRadioButton()} id="customRadio9" name="example" value="9"/>
                                        <label className="custom-control-label" htmlFor="customRadio9"></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   <label> 12 ABONOS DE</label> 
                                </td>
                                <td>
                                    <label> $ {this.state.informacionPagosMeses.importeabono12meses}</label>
                                </td>
                                <td>
                                    <label> TOTAL A PAGAR $ {this.state.informacionPagosMeses.totalpagar12meses}</label>
                                </td>
                                <td>
                                    <label>SE AHORRA $ {this.state.informacionPagosMeses.importeahorro12meses}</label>
                                </td>
                                <td>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input" onClick={() => this.onClickRadioButton()} id="customRadio12" name="example" value="12"/>
                                        <label className="custom-control-label" htmlFor="customRadio12"></label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default VistaPagosMeses;