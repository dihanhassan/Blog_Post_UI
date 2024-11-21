import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ApiService } from "../../shared/services/api.service";
import { CategoryRequest, CategoryResponse, PostCategoryResponse } from "../../shared/api-models";
import { tap } from 'rxjs/operators';
import { postCategoryAction } from "./category.action";

export interface CategoryStateModel {
    categories: CategoryResponse[];
    postCatories: PostCategoryResponse[];
    postCategoriesList : string[];
    postCount : number;
}

@State<CategoryStateModel>({
  name : 'category',
  defaults : {
    categories: [],
    postCatories: [],
    postCategoriesList : [],
    postCount : 0
  }
})
@Injectable()
export class CategoryState {
  constructor(private  apiService : ApiService){}
  @Selector()
  static getAllCategories(state : CategoryStateModel) : CategoryResponse[] {
    return state.categories;
  }
  @Selector()
  static getAllPostCategoriesByPostId(state : CategoryStateModel) : string[] {
    return state.postCategoriesList;
  }

  @Selector()
  static getAllPostCategories(state : CategoryStateModel) : PostCategoryResponse[] {
    return state.postCatories;
  }

  @Selector()
  static categoryWisePostCount(state : CategoryStateModel) : number {
    return state.postCount;
  }

  @Action(postCategoryAction.GetAllCategory)
  getAllCategories(ctx : StateContext<CategoryStateModel>,action: postCategoryAction.GetAllCategory){
    return this.apiService.getAllCategories().pipe(
      tap((result: CategoryResponse[] | null) => {
        if (result ) {
          const state = ctx.getState();
          ctx.setState({
            ...state,
            categories:result,
          });
        }
      })
    );
  }
  @Action(postCategoryAction.GetAllPostCategory)
  getAllPostCategories(ctx : StateContext<CategoryStateModel>,action: postCategoryAction.GetAllPostCategory){
    return this.apiService.getAllPostCategories().pipe(
      tap((result : PostCategoryResponse[] | null)=>{
        if(result){
          const state = ctx.getState();
          ctx.setState({
            ...state,
            categories: state.categories,
            postCatories: result
          });
        }
      })
    );
  }
  @Action(postCategoryAction.GetAllPostCategoryByPostId)
  getAllPostCategoriesByPostId(ctx: StateContext<CategoryStateModel>, action: postCategoryAction.GetAllPostCategoryByPostId) {
    const state = ctx.getState();
    const matchingCategories = state.postCatories.filter(category => category.postId === action.postId);
    const categoriesId = matchingCategories.map(category => category.categoryId);
    const categoryNames = state.categories.filter(category => categoriesId.includes(category.id)).map(category => category.name);
    ctx.setState({
      ...state,
      postCategoriesList: categoryNames
    });
  }

}
