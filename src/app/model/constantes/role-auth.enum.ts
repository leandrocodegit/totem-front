export enum Role{
  ROLE_ROOT = 'ROLE_ROOT',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER'
}

export const RoleDescriptions: Record<Role, string> = {
  [Role.ROLE_ROOT]: 'Root',
  [Role.ROLE_ADMIN]: 'Administrator',
  [Role.ROLE_USER]: 'Usuário regular',
};
