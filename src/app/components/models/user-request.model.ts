import { Role } from "../../model/constantes/role.enum";


export class UserRequest {
  id: string;
  password: string;
  confirmPassword: string;
  email: string;
  nome: string;
  status: boolean;
  roles: Role[];

  constructor(
    id = '',
    nome = '',
    password = '',
    confirmPassword = '',
    email = '',
    status = false,
    roles = [],
  ) {
    this.id = id;
    this.nome = nome;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.email = email;
    this.status = status;
    this.roles = roles;
  }
}
