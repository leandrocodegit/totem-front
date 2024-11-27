

export class Integracao {
  id: string;
  nome: string;
  clientId: string;
  secret: string;
  status: boolean;

  constructor(
    id = '',
    nome = '',
    clientId = '',
    secret = '',
    status = false
  ) {
    this.id = id;
    this.nome = nome;
    this.clientId = clientId;
    this.secret = secret;
    this.status = status;
  }
}
