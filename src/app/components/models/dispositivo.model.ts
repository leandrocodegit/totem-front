import { Configuracao } from "./configuracao.model";
import { Comando } from "./constantes/comando";


export interface Dispositivo {
  mac: string;
  nome: string;
  ip: string;
  memoria: number;
  ativo: boolean;
  conexao: string;
  configuracao: Configuracao
  comando: Comando
}
