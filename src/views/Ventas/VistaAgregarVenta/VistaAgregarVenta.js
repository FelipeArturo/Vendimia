import React, { Component } from 'react';
import {Card,CardHeader,CardBody,Button,Alert} from 'reactstrap';
import Globales from '../../../Utils/Globales';
import RenglonArtVenta from '../RenglonArtVenta/RenglonArtVenta';
import SeccionPagosMesos from '../VistaPagosMeses/VistaPagosMeses';
import { Typeahead } from 'react-bootstrap-typeahead';
import ModalCargando from '../../Generales/ModalCargando/ModalCargando';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class VistaAgregarVenta extends Component {
    constructor(){
        super();

        this.asignarValorState = this.asignarValorState.bind(this);
        //this.onClickAgregarArticulo = this.onClickAgregarArticulo.bind(this);

        //this.onChangeSelectCliente = this.onChangeSelectCliente.bind(this);
        //this.onChangeSelectArticulo = this.onChangeSelectArticulo.bind(this);
        //this.onChangeInputCantidad = this.onChangeInputCantidad.bind(this);
        //this.onClickSiguiente = this.onClickSiguiente.bind(this);
        //this.onChangeRadioButton = this.onChangeRadioButton.bind(this);
        //this.onClickGuardar = this.onClickGuardar.bind(this);
        //this.onClickCancelar = this.onClickCancelar.bind(this);

        //this.guardarVenta = this.guardarVenta.bind(this);
        //this.calcularInfTotalEngancheBonificacion = this.calcularInfTotalEngancheBonificacion.bind(this);
        //this.obtieneConteoVentas = this.obtieneConteoVentas.bind(this);

        //this.mostrarControlMensaje = this.mostrarControlMensaje.bind(this);
        //this.validarInformacion = this.validarInformacion.bind(this);

        this.state={}
        this.state.mostrarVentanaPagos={
            showSeccionPagos:false
        }
        this.state.opcionesSeleccionadas={
            clavecliente:'',
            nombrecliente:'',
            rfccliente:''
        };
        this.state.opcionArticulo={
            clavearticulo: '',
            descripcion: '',
            existencia: 0,
            id: 0,
            modelo: '',
            precio: 0,
            cantidad: 1
        };
        this.state.showMensaje = {
            colorHeader:'',
            mensajeBody:'',
        };
        this.state.mostarModalMensaje = false;
        this.state.listadoArticulosSeleccionados=[];
        this.state.articulosCalculaInformacion=[];
        this.state.informacionArticulo={
            cantidad:0,
            precio:0,
            importe:0
        };
        this.state.informacionTotal={
            enganche:parseFloat(0).toFixed(2),
            bonificacionenganche:parseFloat(0).toFixed(2),
            total:parseFloat(0).toFixed(2)
        };
        this.state.showMensaje = {
            colorHeader:'',
            mensajeBody:'',
        };
        this.state.mostarModalMensaje = false;
        this.state.opcionSeleccionadaRadio={
            opcion:''
        }
        this.state.objVenta={
            folioventa:'',
            clavecliente:'',
            nombre:'',
            total:0,
            cantidad:0,
            idarticulo:0
        };
        this.state.modalCargando = {
            mostrarModal:false,
            mensaje:''
        };
    }

    /** Metodos que se ejecutaran antes y despues de renderizar la vista */
    componentDidMount(){
        /** Se oculta el boton de guardar */
        document.getElementById("btnGuardar").style.display="none";
    }
    
    componentWillMount(){
        /** Se llama el metodo que obtendra el folio de vnta */
        this.obtieneConteoVentas();
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

    /** Metodo onchange para el select cliente */
    onChangeSelectCliente(s){
        if(s.length > 0){
            /** Se agrega el nombre a la propiedad del state */
            this.asignarValorState('nombrecliente',s[0].nombre,'opcionesSeleccionadas');
            this.asignarValorState('clavecliente',s[0].clavecliente,'opcionesSeleccionadas');
            this.asignarValorState('rfccliente',s[0].rfc,'opcionesSeleccionadas');
            /** se muestra el div donde se encuentra el rfc */
            document.getElementById("divRfc").style.display="inline";
        }else{
            /** Se limpia el nombre y clave a la propiedad del state */
            this.asignarValorState('nombrecliente','','opcionesSeleccionadas');
            this.asignarValorState('clavecliente','','opcionesSeleccionadas');
            this.asignarValorState('rfccliente','','opcionesSeleccionadas');
            /** se oculta el div donde se encuentra el rfc */
            document.getElementById("divRfc").style.display="none";
        }
    }

    onChangeSelectArticulo(s){
        if(s.length > 0){
            /** se valida si se podra agregar a la tabla o no */
            if(s[0].existencia > 0){
                /** Se agregan los valores a las propiedades del state */
                this.asignarValorState('clavearticulo',s[0].clavearticulo,'opcionArticulo');
                this.asignarValorState('descripcion',s[0].descripcion,'opcionArticulo');
                this.asignarValorState('existencia',s[0].existencia,'opcionArticulo');
                this.asignarValorState('id',s[0].id,'opcionArticulo');
                this.asignarValorState('modelo',s[0].modelo,'opcionArticulo');
                this.asignarValorState('precio',s[0].precio,'opcionArticulo');
                /** se habilita el boton */
                document.getElementById("btnAddArticulo").disabled = false;
            }else{
                /** Se limpia el state */
                this.asignarValorState('clavearticulo','','opcionArticulo');
                this.asignarValorState('descripcion','','opcionArticulo');
                this.asignarValorState('existencia',0,'opcionArticulo');
                this.asignarValorState('id',0,'opcionArticulo');
                this.asignarValorState('modelo','','opcionArticulo');
                this.asignarValorState('precio',0,'opcionArticulo');
                /** se deshabilita el boton */
                document.getElementById("btnAddArticulo").disabled = true;
                /** Se muestra el mensaje de que no se puede agregar el articulo a la tabla */
                this.mostrarControlMensaje('El artículo seleccionado no cuenta con existencia, favor de verificar','danger','showMensaje');
            }
        }
    }

    onChangeInputCantidad(objInformacion){
        /** Se determina si el articulo agregado al arreglo existe o no */
        var index = this.state.articulosCalculaInformacion.indexOf(objInformacion);
        /** Si el articulo no existe entonces se agrega al listado */
        if(index < 0){
            /** Se agrega el objeto al arreglo */
            this.state.articulosCalculaInformacion.push(objInformacion);
        }else{
            /** Se realiza el reemplazo del objeto */
            this.state.articulosCalculaInformacion.splice(index,1,objInformacion);
        }
        /** Se llama el metodo que calculara toda la informacion */
        this.calcularInfTotalEngancheBonificacion();
    }

    onChangeRadioButton(opcion){
        /** Se asigna el valor al state */
        this.asignarValorState('opcion',opcion,'opcionSeleccionadaRadio')
    }

    /** Metodo que se encargara de realizar los calculos necesarios para calcular el total
     *  enganche de bonificacion y enganche
    */
    calcularInfTotalEngancheBonificacion(){
        /** Variables para calcular el porcentaje de enganche, Bonificacion de enganche y el total */
        var porcentajeEnganche = parseFloat(0);
        var bonificacionEnganche = parseFloat(0);
        var totalAdeudo = parseFloat(0);
        /** Se recorre el arreglo */
        for(var i = 0; i < this.state.articulosCalculaInformacion.length;i++){
            /** Se obtiene el objeto en la posicion del arreglo */
            var object = this.state.articulosCalculaInformacion[i];
            /** Se calcula el iva del producto */
            var precioiva = (parseFloat(object.precio) * (1 + ((parseFloat(this.props.objConfiguracion.tasafinanciamiento) * parseInt(this.props.objConfiguracion.plazomaximo)) / parseFloat(100)))).toFixed(2);
            /** Se calcula el importe del producto */
            var importeproducto = precioiva * parseInt(object.cantidad);
            /** Se calcula el porcentaje enganche */
            var enganche = ((parseFloat(this.props.objConfiguracion.porcientoenganche)/parseInt(100)) * importeproducto).toFixed(2);
            /** Se calcula la bonificacion del enganche */
            var boniEnganche = (enganche * ((parseFloat(this.props.objConfiguracion.tasafinanciamiento) * parseFloat(this.props.objConfiguracion.plazomaximo)) / parseInt(100))).toFixed(2);
            /** Se calcula el total */
            var total = (parseFloat(importeproducto) - parseFloat(enganche) - parseFloat(boniEnganche)).toFixed(2);
            /** Se asignan los valores a las variables necesarias para llevar el conteo */
            porcentajeEnganche = parseFloat(parseFloat(porcentajeEnganche) + parseFloat(enganche)).toFixed(2);
            bonificacionEnganche = parseFloat(parseFloat(bonificacionEnganche) + parseFloat(boniEnganche)).toFixed(2);
            totalAdeudo = parseFloat(parseFloat(totalAdeudo) + parseFloat(total)).toFixed(2);
        }
        /** Se asigna la informacion al state */
        this.asignarValorState('enganche',parseFloat(porcentajeEnganche).toFixed(2),'informacionTotal');
        this.asignarValorState('bonificacionenganche',parseFloat(bonificacionEnganche).toFixed(2),'informacionTotal');
        this.asignarValorState('total',parseFloat(totalAdeudo).toFixed(2),'informacionTotal');
    }

    /** Metodos que se ejcutaran al realizar click en los botones */
    onClickAgregarArticulo(){
        /** Validacion para determinar si se agregara el elemento seleccionado al listado */
        if(this.state.opcionArticulo.id > 0){
            /** Se crea un objeto para asignar la informacion */
            var objArt = {
                clavearticulo:this.state.opcionArticulo.clavearticulo,
                descripcion:this.state.opcionArticulo.descripcion,
                existencia:this.state.opcionArticulo.existencia,
                //id:this.state.opcionArticulo.id,
                modelo:this.state.opcionArticulo.modelo,
                precio:this.state.opcionArticulo.precio,
                cantidad:this.state.opcionArticulo.cantidad
            };

            /** Se agrega el articulo al listado  */
            this.state.listadoArticulosSeleccionados.push(objArt);

            /** Prueba de error */
            this.onChangeSelectArticulo(this.state.listadoArticulosSeleccionados);
        }

        /** Se limpia el typeahead */
        this._Typeahead.clear();
    }

    onClickEliminarArticulo(objArticulo){
        console.log("Articulo que recibe el metodo");
        console.log(objArticulo);
        /** Variables de contenedor */
        var arrArticulosSeleccionados = [];
        /** Se recorre el arreglo de elementos seleccionados */
        for(var i = 0; i < this.state.listadoArticulosSeleccionados.length; i++){
            var articuloSelecc = this.state.listadoArticulosSeleccionados[i];
            console.log("Articulo que se obtiene del arreglo");
            console.log(articuloSelecc);
            /** Validacion para determinar si es el mismo articulo a eliminar */
            if(objArticulo.clavearticulo !== articuloSelecc.clavearticulo){
                arrArticulosSeleccionados.push(articuloSelecc);
            }
            console.log("Arreglo temporal de guardado");
            console.log(arrArticulosSeleccionados);
        }
        /** Se limpia el arreglo que contiene los articulos selecionados */
        this.state.listadoArticulosSeleccionados.length = 0;
        console.log("Articulos en el arreglo despues de limpiar");
        console.log(this.state.listadoArticulosSeleccionados);

        console.log("Articulos en el arreglo temporal antes de guardar en el arreglo anterior");
        console.log(arrArticulosSeleccionados);
        /** Se agrega el arreglo que contiene los articulos que no se eliminaron del listado de articulos seleccionados */
        this.state.listadoArticulosSeleccionados = arrArticulosSeleccionados;
        console.log("Articulos en el arreglo despues de asignar el nuevo arreglo");
        console.log(this.state.listadoArticulosSeleccionados);
        /** Se realiza la resta del articulo eliminado */
        this.calcularInfTotalEngancheBonificacion(); 
    }

    onClickSiguiente(){
        /** Se valida si cumple con las condiciones para mostrar las siguiente vista */
        this.validarInformacion();
    }

    onClickGuardar(){
        /** Se valida que se haya seleccionado una opcion de pago */
        if(this.state.opcionSeleccionadaRadio.opcion !== ''){
            /** Se asigna la informacion del modal para visualizarlo */
            this.asignarValorState('mensaje','Guardando','modalCargando');
            this.asignarValorState('mostrarModal',true,'modalCargando');
            /** Se asigna la informacion al objeto que se enviara a la bd */
            //this.asignarValorState('folioventa',,'objVenta');
            this.asignarValorState('clavecliente',this.state.opcionesSeleccionadas.clavecliente,'objVenta');
            this.asignarValorState('nombre',this.state.opcionesSeleccionadas.nombrecliente,'objVenta');
            this.asignarValorState('total',this.state.informacionTotal.total,'objVenta');
            this.asignarValorState('idarticulo',this.state.opcionArticulo.id,'objVenta');
            this.asignarValorState('cantidad',this.state.informacionArticulo.cantidad,'objVenta');
            /** realiza la peticion a guardar en la bd */
            this.guardarVenta();
            /** Se realiza el returno del prop */
            this.props.onClickEventoAfterSave();
        }else{
            /** Se muestra el mensaje de que no se puede agregar el articulo a la tabla */
            this.mostrarControlMensaje('Debe seleccionar un plazo para realizar el pago de su compra','danger','showMensaje');
        }
    }

    onClickCancelar(){
        this.props.onClickCancelarVenta();
    }

    /** Se valida la informacion para determinar si cumplen las condiciones */
    validarInformacion(){
        /** Se valida que se haya seleccionado un cliente */
        if(this.state.opcionesSeleccionadas.clavecliente !== ''){
            /** Se valida que se haya seleccionado un articulo */
            if(this.state.opcionArticulo.clavearticulo !== '' && this.state.opcionArticulo.id > 0){
                /** Se valida que al menos haya seleccionado un articulo */
                if(this.state.informacionArticulo.cantidad > 0){
                    /** Se asigna el valor para mostrar la seccion de pagos */
                    this.asignarValorState('showSeccionPagos',true,'mostrarVentanaPagos');
                    /** Se deshabilita el boton de siguiente */
                    document.getElementById("btnSiguiente").style.display="none";
                    /** Se hablita el boton de guardar */
                    document.getElementById("btnGuardar").style.display="inline";
                }else{
                    /** Mensaje de error de que debe seleccionar el articulo */
                    this.mostrarControlMensaje('Se debe agregar un artículo a la tabla','danger','showMensaje');
                    /** Se deshablita el boton de guardar */
                    document.getElementById("btnGuardar").style.display="none";
                    /** Se habilita el boton de siguiente */
                    document.getElementById("btnSiguiente").style.display="inline";
                }
            }else{
                /** Mensaje de error de que debe seleccionar el articulo */
                this.mostrarControlMensaje('Se debe seleccionar un artículo','danger','showMensaje');
                /** Se deshablita el boton de guardar */
                document.getElementById("btnGuardar").style.display="none";
                /** Se habilita el boton de siguiente */
                document.getElementById("btnSiguiente").style.display="inline";
            }
        }else{
            /** Mensaje de error de que debe seleccionar el cliente */
            this.mostrarControlMensaje('Se debe seleccionar un cliente','danger','showMensaje');
            /** Se deshablita el boton de guardar */
            document.getElementById("btnGuardar").style.display="none";
            /** Se habilita el boton de siguiente */
            document.getElementById("btnSiguiente").style.display="inline";
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

    /** Metodos que realizaran peticiones al api */
    guardarVenta(){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Ventas/guardarVenta',{
            method:'POST',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            },body:JSON.stringify(this.state.objVenta)
        })
        .then(res => res.json())
        .then(Respuesta => {
            /** Se asigna la informacion del modal para ocultarlo */
            this.asignarValorState('mensaje','','modalCargando');
            this.asignarValorState('mostrarModal',false,'modalCargando');
            /** Se valida para determinar si se realizo el guardado correctamnte o no */
            if(Respuesta.objetoStatus.codigoError.split(" ")[0] === "201"){
                this.mostrarControlMensaje(Respuesta.objetoStatus.mensajeError,'success','showMensaje');
            }else{
                this.mostrarControlMensaje(Respuesta.objetoStatus.mensajeError,'danger','showMensaje');
            }
        })
    }

    obtieneConteoVentas(){
        //Realizar la peticion para 
        fetch(Globales.Host + Globales.Name + Globales.Service + 'Ventas/countVentas',{
            method:'GET',
            headers:{
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(Respuesta => {
            /** Se asigna el valor al state */
            this.asignarValorState('folioventa',Respuesta.conteoClave,'objVenta');
        })
    }

    render(){
        /** variable donde se guardara el div de los pagos */
        let seleccionarPagos;
        let mostrarModalCargando;

        /** Validacion para determinar si se crea la vista o no */
        if(this.state.mostrarVentanaPagos.showSeccionPagos === true){
            seleccionarPagos = <div className="animated fadeIn">
                <SeccionPagosMesos 
                    objInformacionTotal = {this.state.informacionTotal}
                    objConfiguracion = {this.props.objConfiguracion}
                    onClickRadioButton = {(opcion) => this.onChangeRadioButton(opcion)}
                />
            </div>
        }else{
            seleccionarPagos = <div className="animated fadeIn"></div>
        }

        if(this.state.modalCargando.mostrarModal === true){
            mostrarModalCargando = <div className="animated fadeIn">
                <ModalCargando
                    modalCargando = {this.state.modalCargando.mostrarModal}
                    mensaje = {this.state.modalCargando.mensaje}
                />
            </div>
        }else{
            mostrarModalCargando = <div className="animated fadeIn"></div>
        }

        return(
            <div className="row mt-5">
                <div className="col-xs-12 col-sm-12 col-md-12">
                    <Card className="rounded">
                        <CardHeader className="bg-primary rounded justify-content-center" style={{marginLeft:"25px",marginRight:"25px",marginTop:"-20px"}}> Registro de Ventas </CardHeader>
                        <CardBody>
                            <div>
                                {mostrarModalCargando}
                            </div>
                            <div className="row mt-1">
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <div className="float-xs-right float-sm-right float-md-right">
                                        <div className="input-group">
                                            <div className="input-group-prepend" >
                                                <span className="input-group-text text-primary">
                                                    Folio Venta {this.state.objVenta.folioventa}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <Alert color={this.state.showMensaje.colorHeader} isOpen={this.state.mostarModalMensaje}>
                                    {this.state.showMensaje.mensajeBody}
                                </Alert>
                            </div>
                            <div className="row mt-3">
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend" >
                                            <span className="input-group-text">
                                                Cliente &nbsp;&nbsp;
                                            </span>
                                        </div>
                                        <Typeahead
                                            id="typeaheadclientes"
                                            options={this.props.listadoClientes}
                                            placeholder="Seleccione ..."
                                            labelKey={(option) => `${option.clavecliente} - ${option.nombre}`}
                                            onChange={(s) => this.onChangeSelectCliente(s)}
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-3 col-sm-3 col-md-3" id="divRfc" style={{display:"none"}}>
                                    <div className="input-group">
                                        <div className="input-group-prepend" >
                                            <span className="input-group-text">
                                                RFC 
                                            </span>
                                        </div>
                                        <input type="text" value={this.state.opcionesSeleccionadas.rfccliente} disabled={true} 
                                               className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend" >
                                            <span className="input-group-text">
                                                Articulos
                                            </span>
                                        </div>
                                        <Typeahead
                                            id="typeaheadarticulos"
                                            options={this.props.listadoArticulos}
                                            placeholder="Seleccione ..."
                                            labelKey={(option) => `${option.descripcion} - ${option.modelo}`}
                                            onChange={(s) => this.onChangeSelectArticulo(s)}
                                            ref = {(refArt) => this._Typeahead = refArt}
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1">
                                    <div className="input-group">
                                        <Button color="primary" id="btnAddArticulo" onClick={() => this.onClickAgregarArticulo()}>
                                            <i className="fa fa-plus "> </i>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <table className="table table-sm table-hover">
                                        <thead className="table-secondary">
                                            <tr>
                                                <th>Descripción Articulo</th>
                                                <th>Modelo</th>
                                                <th>Cantidad</th>
                                                <th>Precio</th>
                                                <th>Importe</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.listadoArticulosSeleccionados.map((e) => 
                                                <RenglonArtVenta
                                                    articulo = {e}
                                                    onChangeInput = {(objInformacion) => this.onChangeInputCantidad(objInformacion)}
                                                    objConfiguracion = {this.props.objConfiguracion}
                                                    onClickDelete = {(objArticulo) => this.onClickEliminarArticulo(objArticulo)}
                                                />
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row mt-1">
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <div className="float-xs-right float-sm-right float-md-right">
                                        <div className="input-group">
                                            <div className="input-group-prepend" >
                                                <span className="input-group-text">
                                                    Enganche: {this.state.informacionTotal.enganche}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-1">
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <div className="float-xs-right float-sm-right float-md-right">
                                        <div className="input-group">
                                            <div className="input-group-prepend" >
                                                <span className="input-group-text">
                                                    Bonificacion Enganche: {this.state.informacionTotal.bonificacionenganche} 
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-1">
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <div className="float-xs-right float-sm-right float-md-right">
                                        <div className="input-group">
                                            <div className="input-group-prepend" >
                                                <span className="input-group-text">
                                                    Total: {this.state.informacionTotal.total}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {seleccionarPagos}
                            </div>
                            <div className="row mt-4">
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <div className="float-xs-right float-sm-right float-md-right">
                                        <Button id="btnCancelar" className="mr-1" color="danger" onClick={() => this.onClickCancelar()}>
                                            Cancelar
                                        </Button>
                                        <Button id="btnSiguiente" color="success" onClick={() => this.onClickSiguiente()}>
                                            Siguiente
                                        </Button>
                                        <Button id="btnGuardar" color="success" onClick={() => this.onClickGuardar()}>
                                            Guardar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        )
    }
}
export default VistaAgregarVenta;