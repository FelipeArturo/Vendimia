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

