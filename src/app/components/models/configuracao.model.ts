import { Efeito } from "./constantes/Efeito";


export interface Configuracao {
  cor: number[];
  primaria: string;
  secundaria: String;
  leds: number;
  faixa: number;
  intensidade: number[];
  velocidade: number;
  correcao: number[];
  efeito: Efeito;   
}
