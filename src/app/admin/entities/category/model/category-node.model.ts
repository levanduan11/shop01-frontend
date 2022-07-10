



export class CategoryNode {
  constructor(
    public name?: string,
    public alias?: string,
    public child?: CategoryNode[]
  ) {}
}
