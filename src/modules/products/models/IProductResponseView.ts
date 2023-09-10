export interface IProductResponseView {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  brand: string;
  price: number;
  quantity: number;
  sold: number;
  userobj: Userobj;
  categoryObj: CategoryObj;
  subCategoryObj: SubCategoryObj;
  __v: number;
}
export interface Userobj {
  _id: string;
  username: string;
  email: string;
  password: string;
  imageUrl: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface CategoryObj {
  _id: string;
  name: string;
  description: string;
  subCategories?: string[] | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface SubCategoryObj {
  _id: string;
  name: string;
  description: string;
  __v: number;
}
