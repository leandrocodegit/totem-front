import { Efeito } from "./constantes/Efeito";
export class Cor {
  id: string;
  nome: string;
  cor: number[];
  primaria: string;
  secundaria: String;
  velocidade: number;
  correcao: number[];
  efeito?: Efeito;
  mac: string;
  time: number;
  rapida: boolean;

  constructor(
    id = '',
    nome = '',
    cor = [0,0,255,255,0,0],
    primaria = 'blue',
    secundaria = 'red',
    velocidade = 100,
    correcao = [255,255,255],
    efeito = Efeito.COLORIDO,
    mac = '',
    time = 1,
    rapida = false
  ) {
    this.id = id;
    this.nome = nome;
    this.cor = cor;
    this.primaria = primaria;
    this.secundaria = secundaria;
    this.velocidade = velocidade;
    this.correcao = correcao;
    this.efeito = efeito;
    this.mac = mac;
    this.time = time;
    this.rapida = rapida;
  }
}
