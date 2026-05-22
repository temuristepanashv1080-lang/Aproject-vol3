

export class Product {
  _id!: string;
  title!: string;
  description!: string;
  brand!: string;
  category!: Category;
  images: string[] =[];
  thumbnail!: string;
  issueDate!: Date;
  rating!: number;
  stock!: number;
  warranty!: number;
  price!: Price;

  // constructor(data?: Partial<Product>) {
  //   Object.assign(this, data);

  //   // convert string -> Date
  //   if (data?.issueDate) {
  //     this.issueDate = new Date(data.issueDate);
  //   }
  // }
}

export class Category {
  id!: string;
  name!: string;
  image!: string;

  // constructor(data?: Partial<Category>) {
  //   Object.assign(this, data);
  // }
}

export class Price {
  beforeDiscount!: number;
  current!: number;
  currency!: string;
  discountPercentage!: number;

  // constructor(data?: Partial<Price>) {
  //   Object.assign(this, data);
  // }
}