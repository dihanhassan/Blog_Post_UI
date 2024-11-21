export interface CategoryResponse {
  id : number;
  name : string;
  route: string;
  createdby : string;
}

export interface PostCategoryResponse {
  id: number ;
  categoryId: number;
  postId: number;
  createdOn: Date;
  updatedOn: Date;
  isDeleted: boolean;
}