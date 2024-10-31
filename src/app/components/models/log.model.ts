import { Configuracao } from "./configuracao.model";
import { Comando } from "./constantes/comando";
import { Dispositivo } from "./dispositivo.model";


export interface Log {
  id: string;
  usuario: string;
  descricao: string;
  comando: Comando;
  data: Date;
  configuracao: Configuracao;

}
