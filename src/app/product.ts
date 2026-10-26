export class Product {
    constructor(public productName: string,
     public productDescription: string, 
     public imageUrl: string, 
    public productPrice: number,
    public id?: number | string){}

}
