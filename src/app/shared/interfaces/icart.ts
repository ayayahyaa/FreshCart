export interface Icart{
  _id:           string;
  cartOwner:     string;
  products:      productElement[];
  createdAt:     Date;
  updatedAt:     Date;
  __v:           number;
  totalCartPrice:number;
}

export interface productElement{
  count:         number;
  _id:           string;
  product:       productProduct;
  price:         number;
}
export interface productProduct{
  subcategory:   Brand[];
  _id:           string;
  title:         string;
  quantity:      number;
  imageCover:    string;
  category:      Brand;
  brand:         Brand;
  ratingsAverage:number;
  id:            string;
}

export interface Brand{
  _id:           string;
  name:          string;
  slug:          string;
  image?:        string;
  category?:     string;
}

