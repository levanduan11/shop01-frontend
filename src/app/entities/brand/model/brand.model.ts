export interface IBrand {
  id?: number;
  name?: string;
  logo?: string;
  categories?: string[];

}

export class Brand implements IBrand {
  constructor(
    public id?: number,
    public name?: string,
    public logo?: string,
    public categories?: string[],
    
  ) {}
}

export function getBrandIdentifier(brand:IBrand):number|undefined {
  return brand.id;
}
