export interface ICategory {
  id?: number;
  name?: string;
  alias?: string;
  image?: string;
  enabled?: boolean;
  parent_id?: number;
  hasChild?: boolean;
}

export class Category implements ICategory {
  constructor(
    public id?: number,
    public name?: string,
    public alias?: string,
    public image?: string,
    public enabled?: boolean,
    public parent_id?: number,
    public hasChild?:boolean
  ) {}
}

export function getCategoryIdentifier(category:ICategory): number | undefined{
  return category.id;
}
