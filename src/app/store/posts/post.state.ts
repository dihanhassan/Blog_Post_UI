import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ApiService } from "../../shared/services/api.service";
import { tap } from 'rxjs/operators';
import { postAction } from "./post.action";
import { PostsResponse } from "../../shared/api-models/response/post/post-response.model";

export interface PostStateModel {
    posts: PostsResponse[];
    post : PostsResponse;
}

@State<PostStateModel>({
  name : 'post',
  defaults : {
    posts: [],
    post : {} as PostsResponse
  }
})
@Injectable()
export class PostState {
  constructor(private  apiService : ApiService){}
  @Selector()
  static getAllPosts(state : PostStateModel) : PostsResponse[] {
    return state.posts ;
  }

  @Selector()
  static getPostById(state : PostStateModel) : PostsResponse {
    return state.post;
  }

  @Selector()
  static getPostByCategory(state : PostStateModel) : PostsResponse[] {
    return state.posts;
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
  @Action(postAction.GetPostByCategory)
  GetPostByCategory(ctx: StateContext<PostStateModel>, action: postAction.GetPostByCategory) {
    console.log("Hello"+ action.id);
    return this.apiService.getAllPostByCategoryId(action.id).pipe(
      tap((result : PostsResponse[] | null)=>{
        if(result){
          const state = ctx.getState();
          ctx.setState({
            ...state,
            posts: result
          });
        }
      })
    );
  }
  @Action(postAction.GetPostById)
  getPostById(ctx: StateContext<PostStateModel>, action: postAction.GetPostById) {
    const state = ctx.getState();
    
    const post = state.posts.find(p => p.id === action.id);
    if (post) {
      ctx.setState({
        ...state,
        post: post,
      });
    } 
    else {
      ctx.setState({
        ...state,
        post: {} as PostsResponse, 
      });
    }
  }
 

}
