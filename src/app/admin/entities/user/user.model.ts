export interface IUser {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  imageUrl?: string;
  activated?: boolean;
  createdDate?: Date;
  authorities?: string[];
}
export class User implements IUser {
  constructor(
    public id?: number,
    public username?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public password?: string,
    public imageUrl?: string,
    public activated?: boolean,
    public createdDate?: Date,
    public authorities?: string[]
  ) {}
}
