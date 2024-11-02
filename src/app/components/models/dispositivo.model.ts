import { Configuracao } from "./configuracao.model";
import { Comando } from "./constantes/comando";


export interface Dispositivo {
  selecionado: boolean;
  mac: string;
  nome: string;
  ip: string;
  memoria: number;
  ativo: boolean;
  conexao: string;
  configuracao: Configuracao
  configuracoes: Configuracao[]
  comando: Comando
}
