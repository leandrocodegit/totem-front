import { Cor } from "./cor.model";
import { Comando } from "./constantes/comando";
import { Endereco } from "./endereco.model";
import { Configuracao } from "./configuracao.model";


export interface Dispositivo {
  selecionado: boolean;
  mac: string;
  nome: string;
  ip: string;
  versao: string;
  ignorarAgenda: boolean;
  memoria: number;
  ativo: boolean;
  status: string;
  latitude: number;
  longitude: number;
  cor: Cor;
  configuracao: Configuracao;
  comando: Comando,
  endereco: Endereco,
  enderecoCompleto: string;
  timer: boolean;
}
