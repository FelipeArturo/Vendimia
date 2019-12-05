/* Metodos que se usaran para asignar los valores a los states */
export function AsignarValorState(campo,valor,objeto){
    //Se crea el objeto que hara referncia al state
    let Obj = this.state[objeto];
    //Se crea el switch para entrar a las opciones
    Obj[campo] = valor;
    //Se realiza la actualizacion del state
    this.setState({
        objeto:Obj
    })
}