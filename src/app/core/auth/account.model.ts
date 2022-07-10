export class Account {
  constructor(
    public id: number,
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public imageUrl: string,
    public activated: boolean,
    public authorities: string[]
  ) {}
}
