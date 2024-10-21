

export interface User {
  id: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  doc: string | null;
  cellphone: string | null;
  status: boolean;
  dtBirthday: Date;
  sendEmail: boolean;
  linkAvatar: string;
}

interface AuthResponse {
  user: User;
  token: string;
  expiresIn: string;
}
