import { Cor } from "./cor.model";
import { TipoAgenda } from "./constantes/TipoAgenda";
import { Dispositivo } from "./dispositivo.model";

export class Agenda {
  id: string;
  nome: string;
  execucao: Date;
  inicio: Date;
  termino: Date;
  status: string;
  ativo: boolean;
  cor: Cor;
  dispositivos: string[];
  todos: boolean;

  constructor(
    id = '',
    nome = '',
    execucao = new Date,
    inicio = new Date,
    termino = new Date,
    status = '',
    ativo = false,
    cor = new Cor,
    dispositivos = [],
    todos = false
  ) {
    this.id = id;
    this.nome = nome;
    this.execucao = execucao;
    this.inicio = inicio;
    this.status = status;
    this.termino = termino;
    this.ativo = ativo;
    this.cor = cor;
    this.dispositivos = dispositivos;
    this.todos = todos;
  }
}
