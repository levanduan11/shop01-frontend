
export interface ICategoryForNew{
  id?: number;
  name?: string;
}

export class CategoryForNew implements ICategoryForNew{
  constructor(public id?: number, public name?: string) {}
}
