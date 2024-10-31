import { Configuracao } from "./configuracao.model";
import { Comando } from "./constantes/comando";
import { Dispositivo } from "./dispositivo.model";


export interface Logconexao {
  hora: number;
  comando: Comando;
  quantidade: number;
}
