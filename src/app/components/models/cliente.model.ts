import { Endereco } from "./endereco.model";
export class Cliente {
  id: string;
  nome: string;
  ativo: boolean;
  principal: boolean;
  endereco: Endereco;

  constructor(
    id = '',
    nome = '',
    ativo = false,
    principal = false,
    endereco = new Endereco,
  ) {
    this.id = id;
    this.nome = nome;
    this.ativo = ativo;
    this.principal = principal;
    this.endereco = endereco;
  }
}
