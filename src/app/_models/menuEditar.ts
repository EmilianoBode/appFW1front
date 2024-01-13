import { tipoMenu } from "./tipoMenu";

export interface menuEditar{
    
    id: number;
    name: string;
    url: string;
    tipo: tipoMenu;
    icono: string;
    ejecuta: string;
    padre: number;
    orden: number;

}