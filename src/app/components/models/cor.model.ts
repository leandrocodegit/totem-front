import { Parametro } from "./parametro.model";
export class Cor {
  id: string;
  nome: string;
  deviceId: number;
  time: number;
  rapida: boolean;
  vibracao: boolean;
  exclusiva: boolean;
  velocidade: number;
  quantidadePinos: number;
  parametros: Parametro[];

  constructor(
    id = '',
    nome = '',
    deviceId = 0,
    time = 1,
    rapida = false,
    vibracao = false,
    exclusiva = false,
    velocidade = 0,
    quantidadePinos = 0,
    parametros = []
  ) {
    this.id = id;
    this.nome = nome;
    this.deviceId = deviceId;
    this.time = time;
    this.rapida = rapida;
    this.vibracao = vibracao;
    this.exclusiva = exclusiva;
    this.velocidade = velocidade;
    this.quantidadePinos = quantidadePinos;
    this.parametros = parametros;
  }
}
