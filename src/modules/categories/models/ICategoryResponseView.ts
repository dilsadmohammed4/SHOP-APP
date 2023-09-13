export interface ICategoryResponseView {
    _id: string;
    name: string;
    description: string;
    subCategories?: ISubCategoryView[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ISubCategoryView {
    _id: string;
    name: string;
    description: string;
    __v: number;
}
