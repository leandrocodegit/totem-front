export enum Role{
  ROOT = 'ROOT',
  ADMIN = 'ADMIN',
  USER = 'USER',
  AVANCADO = 'AVANCADO',
  ROLE_ROOT = 'ROLE_ROOT',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER',
  ROLE_OPERADOR = 'ROLE_OPERADOR',
  ROLE_AVANCADO = 'ROLE_AVANCADO'
}

export const RoleDescriptions: Record<Role, string> = {
  [Role.ROOT]: 'Root',
  [Role.ADMIN]: 'Administrator',
  [Role.USER]: 'Usuário regular',
  [Role.AVANCADO]: 'Avançado',
  [Role.ROLE_ROOT]: 'Root',
  [Role.ROLE_ADMIN]: 'Administrator',
  [Role.ROLE_USER]: 'Usuário regular',
  [Role.ROLE_AVANCADO]: 'Usuário avançado',
  [Role.ROLE_OPERADOR]: 'Operador',
};
