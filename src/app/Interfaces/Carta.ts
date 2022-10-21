export class Carta{
    id:any;
    valor:any;
    palo:any;

    constructor(id:any,valor:any,palo:any){
        this.palo = palo;
        this.valor = valor;
        this.id = id
    }


    
    toString(){
        return "assets/images/cartas/"+this.valor+""+this.palo+".svg";
    }
    
}