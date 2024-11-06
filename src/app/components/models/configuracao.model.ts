import { Efeito } from "./constantes/Efeito";
export class Configuracao {
  id: string;
  nome: string;
  cor: number[];
  primaria: string;
  secundaria: String;
  leds: number;
  faixa: number;
  intensidade: number;
  velocidade: number;
  correcao: number[];
  efeito?: Efeito;
  mac: string;

  constructor(
    id = '',
    nome = '',
    cor = [0,0,255,255,0,0],
    primaria = 'blue',
    secundaria = 'red',
    leds = 255,
    faixa = 2,
    intensidade = 255,
    velocidade = 100,
    correcao = [255,255,255],
    efeito = Efeito.COLORIDO,
    mac = '',
  ) {
    this.id = id;
    this.nome = nome;
    this.cor = cor;
    this.primaria = primaria;
    this.secundaria = secundaria;
    this.leds = leds;
    this.faixa = faixa;
    this.intensidade = intensidade;
    this.velocidade = velocidade;
    this.correcao = correcao;
    this.efeito = efeito;
    this.mac = mac;
  }
}
