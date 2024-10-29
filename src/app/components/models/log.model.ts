import { Comando } from "./constantes/comando";
import { Dispositivo } from "./dispositivo.model";


export interface Log {
  id: string;
  usuario: string;
  data: Date;
  dispositivo: Dispositivo;
  comando: Comando;
}
