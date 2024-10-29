import { Configuracao } from "./configuracao.model";


export interface Dispositivo {
  mac: string;
  nome: string;
  ip: string;
  memoria: number;
  status: boolean;
  configuracao: Configuracao
}
