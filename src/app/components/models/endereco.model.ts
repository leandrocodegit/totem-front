

export interface Endereco {
  cep: string,
  state: string,
  city: string,
  neighborhood: string,
  street: string,
  complemento: string,
  numero: string,
  location: {
    type: string,
    string: any
  }
}
