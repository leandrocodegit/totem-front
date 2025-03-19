import { Configuracao } from "./configuracao.model";
import { Efeito } from "./constantes/Efeito";
export class Parametro {
  pino: number;
  efeito?: Efeito;
  cor: number[];
  corHexa: string[];
  correcao: number[];
  configuracao: Configuracao;

  constructor(
    id = '',
    pino = 0,
    efeito = Efeito.COLORIDO,
    cor = [0,0,255,255,0,0,0,255,0],
    corHexa = ['red','green','blue'],
    correcao = [255,255,255],
    configuracao = new Configuracao

  ) {
    this.pino = pino;
    this.efeito = efeito;
    this.cor = cor;
    this.corHexa = corHexa;
    this.correcao = correcao;
    this.configuracao = configuracao;
  }
}

