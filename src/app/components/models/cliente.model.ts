import { Endereco } from "./endereco.model";
export class Cliente {
  id: string;
  nome: string;
  ativo: boolean;
  endereco: Endereco;

  constructor(
    id = '',
    nome = '',
    ativo = false,
    endereco = new Endereco,
  ) {
    this.id = id;
    this.nome = nome;
    this.ativo = ativo;
    this.endereco = endereco;
  }
}
