export enum Role{
  ROOT = 'ROOT',
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export const RoleDescriptions: Record<Role, string> = {
  [Role.ROOT]: 'Root',
  [Role.ADMIN]: 'Administrator',
  [Role.USER]: 'Usuário regular',
};
