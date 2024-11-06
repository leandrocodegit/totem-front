import { Configuracao } from "./configuracao.model";
import { Comando } from "./constantes/comando";


export interface Dispositivo {
  selecionado: boolean;
  mac: string;
  nome: string;
  ip: string;
  versao: string;
  ignorarAgenda: boolean;
  memoria: number;
  ativo: boolean;
  conexao: string;
  latitude: number;
  longitude: number;
  configuracao: Configuracao
  configuracoes: Configuracao[]
  comando: Comando
}
