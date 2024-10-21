export enum Role{
  root = 'root',
  admin = 'admin',
  user = 'user'
}

export const RoleDescriptions: Record<Role, string> = {
  [Role.root]: 'Root',
  [Role.admin]: 'Administrator',
  [Role.user]: 'Usuário regular',
};
