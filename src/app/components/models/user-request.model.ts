import { Role } from "../../model/constantes/role.enum";
import { Cliente } from "./cliente.model";


export class UserRequest {
  id: string;
  password: string;
  confirmPassword: string;
  email: string;
  nome: string;
  status: boolean;
  business: boolean;
  roles: Role[];
  cliente?: Cliente;
  clienteId: string;

  constructor(
    id = '',
    nome = '',
    password = '',
    confirmPassword = '',
    email = '',
    status = false,
    business = false,
    roles = [],
    cliente = undefined,
    clienteId = ''
  ) {
    this.id = id;
    this.nome = nome;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.email = email;
    this.status = status;
    this.business = business; 
    this.roles = roles;
    this.cliente = cliente
    this.clienteId = clienteId
  }
}
