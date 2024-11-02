import { Role } from "../../model/constantes/role.enum";


export class User {
  id: string;
  password: string;
  email: string;
  nome: string;
  status: boolean;
  roles: Role[];

  constructor(
    id = '',
    nome = '',
    password = '',
    email = '',
    status = false,
    roles = [],
  ) {
    this.id = id;
    this.nome = nome;
    this.password = password;
    this.email = email;
    this.status = status;
    this.roles = roles;
  }
}
