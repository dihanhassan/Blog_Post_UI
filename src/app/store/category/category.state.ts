import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ApiService } from "../../shared/services/api.service";
import { CategoryRequest, CategoryResponse } from "../../shared/api-models";
import { tap } from 'rxjs/operators';
import { postCategoryAction } from "./category.action";

export interface CategoryStateModel {
    categories: CategoryResponse[];
}

@State<CategoryStateModel>({
  name : 'category',
  defaults : {
    categories: []
  }
})
@Injectable()
export class CategoryState {
  constructor(private  apiService : ApiService){}
  @Selector()
  static getAllCategories(state : CategoryStateModel) : CategoryResponse[] {
    return state.categories;
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
}
