import React, { Component } from 'react';

//Color anteriormente #20a8d8
//para realizar los cambios de colores se uso la clase css de bootstrap que se encuentra en node_module/bootstrap/dist/css/bootstrap.css

//Clase para la vista que se usara como separador
class ViewSeparador extends Component{
    render(){
        return(
            <div>
                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                <h5 className="text-success" >{this.props.titulo}</h5>
                <div className="row" style={{marginBottom:"15px"}}>
                    <div className="col-12">
                        <div className="bg-success" style={{height:"1px"}}></div>
                        <div style={{float:"right",widht:"20px",height:0,borderBottom: "20px solid #4ead33", borderLeft:"25px solid transparent",marginTop:"-20px"}}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewSeparador;