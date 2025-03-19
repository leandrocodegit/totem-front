import { Role } from "../../model/constantes/role.enum";
import { Cliente } from "./cliente.model";


export class User {
  id: string;
  password: string;
  email: string;
  nome: string;
  status: boolean;
  roles: Role[];
  business: boolean;
  nomeCliente: string;

  constructor(
    id = '',
    nome = '',
    password = '',
    email = '',
    status = false,
    roles = [],
    business = false,
    nomeCliente = ''
  ) {
    this.id = id;
    this.nome = nome;
    this.password = password;
    this.email = email;
    this.status = status;
    this.roles = roles;
    this.business = business;
    this.nomeCliente = nomeCliente;
  }
}
