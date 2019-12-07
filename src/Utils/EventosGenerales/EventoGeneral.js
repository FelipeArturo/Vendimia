/* Metodos que se usaran para asignar los valores a los states */
export function obtenerRegexPattern(opcion){
    var pattern = "";
    switch(opcion){
        case "nombres":
            pattern = /[^A-Za-záéíóúÁÉÍÓÚ\s]/
            break;
        case "texto":
            pattern = /[^A-Za-z0-9]/
            break;
        case "numero":
            pattern = /[^0-9]/
            break;
        default:
            break;
    }

    /** Se regresa el valor */
    return pattern;
}

/** Metodo que se encargara de validar que el objeto enviado no contenga valores vacios */
export function aplicaValidacion(control, valor,es_numero){
    let color = "#E8E8E8";
    let indicador = 1;
    let comparacion = null;
    comparacion = es_numero ? 0 : '';
    //validacion para determinar si se proporciono toda la informacion necesaria
    if(es_numero === true){
        color = (parseInt(valor) === comparacion) ? "red" :  color;
    }else{
        color = (valor === comparacion) ? "red" :  color;
    }
    //color = (valor === comparacion) ? "red" :  color;
    document.getElementById(control).style.borderColor=color;
    indicador = (color === "red") ? 1 : 0;
    return indicador;
}

/** Metodo que se encargara de validar que el state y el props que recibe con la informacion no sean iguales */
export function validaStateVsPropObj(stateObj,propObj){
    return (stateObj['nombre'] !== propObj['nombre'] || stateObj['appaterno'] !== propObj['appaterno'] || 
       stateObj['apmaterno'] !== propObj['apmaterno'] || stateObj['rfc'] !== propObj['rfc']) ? true : false;
}