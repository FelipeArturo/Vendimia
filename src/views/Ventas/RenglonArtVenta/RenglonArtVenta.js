import React, { Component } from 'react';
import {obtenerRegexPattern} from '../../../Utils/EventosGenerales/EventoGeneral';

class RenglonArtVenta extends Component{

    constructor(){
        super();

        this.asignarValorState = this.asignarValorState.bind(this);
        this.calcularInformacionInicial = this.calcularInformacionInicial.bind(this);

        this.onChange = this.onChange.bind(this);

        this.state = {};
        this.state.objArticulo={
            clavearticulo: '',
            descripcion: '',
            existencia: 0,
            modelo: '',
            precio: 0
        };
        this.state.objConfiguracion={
            tasafinanciamiento:0,
            porcientoenganche:0,
            plazomaximo:0
        };
        this.state.cantidadArticulos={
            cantidad:1,
            precio:0,
            importe:0
        }
    }

    /** Metodos que se ejecutaran ants y despues de que la vista se renderize */
    componentDidMount(){
        /** Se agregan los valores de las propiedades al state */
        this.asignarValorState('clavearticulo',this.props.articulo.clavearticulo,'objArticulo');
        this.asignarValorState('descripcion',this.props.articulo.descripcion,'objArticulo');
        this.asignarValorState('existencia',this.props.articulo.existencia,'objArticulo');
        this.asignarValorState('modelo',this.props.articulo.modelo,'objArticulo');
        this.asignarValorState('precio',this.props.articulo.precio,'objArticulo');
        /** Se asigna el objeto del props al state */
        this.asignarValorState('tasafinanciamiento',this.props.objConfiguracion.tasafinanciamiento,'objConfiguracion');
        this.asignarValorState('porcientoenganche',this.props.objConfiguracion.porcientoenganche,'objConfiguracion');
        this.asignarValorState('plazomaximo',this.props.objConfiguracion.plazomaximo,'objConfiguracion');
        /** Se llama el metodo que calculara la informacion */
        this.calcularInformacionInicial();
    }

    /** Metodo que calculara la informacion inicial */
    calcularInformacionInicial(){
        /** Se calcula el iva del producto */
        var iva = (parseFloat(this.state.objArticulo.precio) * (1 + ((parseFloat(this.state.objConfiguracion.tasafinanciamiento) * parseInt(this.state.objConfiguracion.plazomaximo)) / parseFloat(100)))).toFixed(2);
        /** Se asigna el valor del precio al state */
        this.asignarValorState('precio',(parseFloat(this.state.objArticulo.precio) + parseFloat(iva)).toFixed(2),'cantidadArticulos');
        /** Se asigna el importe al renglon */
        this.asignarValorState('importe',(parseFloat(this.state.cantidadArticulos.precio) * parseInt(this.state.cantidadArticulos.cantidad)),'cantidadArticulos');

        /** Se regresa el objeto con los precios al onchange del props */
        this.props.onChangeInput(this.state.cantidadArticulos);
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
        if(target.value === ""){
            /** Se asigna el valor al state */
            this.asignarValorState('importe',0,objeto);
            /** Se asigna el valor al state */
            this.asignarValorState(propiedad,target.value,objeto);
        }else{
            /** Validacion para que no pueda sobrepasar la cantidad maxima de la existencia */
            if(parseInt(target.value) > parseInt(this.state.objArticulo.existencia)){
                /** Se asigna el valor al state con el maximo permitido */
                this.asignarValorState(propiedad,parseInt(this.state.objArticulo.existencia),objeto);
            }else{
                if(target.value === "0"){
                    /** Se asigna el valor al state */
                    this.asignarValorState(propiedad,1,objeto);
                }else{
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
                        valorPattern = obtenerRegexPattern("numero");
    
                        /** Se realiza el match para eliminar caracteres no permitidos */
                        if(target.value.match(valorPattern)){
                            document.getElementById(target.id).value = target.value.replace(valorPattern,'');
                        }
                    }
                    
                    /** Se asigna el valor al state */
                    this.asignarValorState(propiedad,target.value,objeto);
                }
            }

            /** Manda a llamar el metodo que realiza los calculos nuevamente */
            this.calcularInformacionInicial();
        }
    }

    render(){
        return(
            <tr>
                <td>
                    <label>{this.state.objArticulo.descripcion}</label>
                </td>
                <td>
                    <label>{this.state.objArticulo.modelo}</label>
                </td>
                <td>
                    <input type="number" className="form-control" id="txtCantidad" style={{width:"100px"}} value={this.state.cantidadArticulos.cantidad}
                           onChange={(e) => this.onChange(e.target,'cantidad','cantidadArticulos')}/>
                </td>
                <td>
                    <label>{this.state.cantidadArticulos.precio}</label>
                </td>
                <td>
                    <label>{this.state.cantidadArticulos.importe}</label>
                </td>
                <td>
                    
                </td>
            </tr>
        )
    }
}

export default RenglonArtVenta;