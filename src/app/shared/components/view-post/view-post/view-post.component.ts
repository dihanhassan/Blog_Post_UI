import { Component, OnInit } from '@angular/core';
import { PostCategoryResponse, PostsResponse } from '../../../api-models';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { postAction } from '../../../../store/posts/post.action';
import { PostState } from '../../../../store/posts/post.state';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HelperUtils } from '../../../utils/helper.utils';
import { postCategoryAction } from '../../../../store/category/category.action';
import { CategoryState } from '../../../../store/category/category.state';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']  // corrected to styleUrls (plural)
})
export class ViewPostComponent implements OnInit {
  post!: PostsResponse;  
  postId!: string;
  postCategories!: string[];
  @Select(PostState.getPostById) post$!: Observable<PostsResponse>;  // Use PostState selector
  @Select(CategoryState.getAllPostCategoriesByPostId) categoryList$!: Observable<string[]>;  // Use PostState selector

  constructor(
    private route: ActivatedRoute,   
    private store: Store
  ) {}

  ngOnInit(): void {
    // Subscribe to route params to get the 'id' from the URL
    this.route.params.subscribe(params => {
      this.postId = params['id']; 
      const id = parseInt(this.postId, 10);  // Parse the 'id' into an integer

      // Dispatch action to get the post by id
      this.store.dispatch(new postAction.GetPostById(id)).subscribe(() => {
        this.post$.subscribe(post => {
          this.post = post;  
          console.log(this.post);  
        });
      });

      // Dispatch action to get the post categories
      this.store.dispatch(new postCategoryAction.GetAllPostCategoryByPostId(id)).subscribe(() => {
        this.categoryList$.subscribe(postCategories => {
          this.postCategories = postCategories;  
        
          console.log(this.postCategories);  
        });
      });

    });
  }

  convertToBanglaDate(englishDate: Date): string {
    return HelperUtils.convertToBanglaDate(englishDate);
  }

}
