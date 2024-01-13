import { tipoMenu } from "./tipoMenu";

export interface MenuDTO {

    id: number;
    name: string;
    url: string;
    tipo: string;
    icono: string;
    ejecuta:string;
    padre: number;
    hijos: MenuDTO[];
}