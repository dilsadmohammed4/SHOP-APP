export interface IUserView {
  _id?: string;
  username?: string;
  imageUrl?: string;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
