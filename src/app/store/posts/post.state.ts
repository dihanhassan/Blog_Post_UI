import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ApiService } from "../../shared/services/api.service";
import { tap } from 'rxjs/operators';
import { postAction } from "./post.action";
import { PostsResponse } from "../../shared/api-models/response/post/post-response.model";

export interface PostStateModel {
    posts: PostsResponse[];
}

@State<PostStateModel>({
  name : 'post',
  defaults : {
    posts: []
  }
})
@Injectable()
export class PostState {
  constructor(private  apiService : ApiService){}
  @Selector()
  static getAllPosts(state : PostStateModel) : PostsResponse[] {
    return state.posts ;
  }

  @Action(postAction.GetAllPosts)
  getAllCategories(ctx : StateContext<PostStateModel>,action: postAction.GetAllPosts){
    return this.apiService.getAllPosts().pipe(
      tap((result: PostsResponse[] | null) => {
        if (result ) {
          const state = ctx.getState();
          ctx.setState({
            ...state,
            posts:result,
          });
        }
      })
    );
  }
}
