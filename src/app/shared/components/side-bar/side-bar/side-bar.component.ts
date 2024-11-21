import { Component, OnInit } from '@angular/core';
import { CategoryResponse, PostsResponse } from '../../../api-models';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { postCategoryAction } from '../../../../store/category/category.action';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryState } from '../../../../store/category/category.state';
import { PostState } from '../../../../store/posts/post.state';
import { postAction } from '../../../../store/posts/post.action';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  categories: CategoryResponse[] = [];
  posts: PostsResponse[] = [];
  id: number = 0;
  selectedCategoryId: number = 0;

  @Select(CategoryState.getAllCategories) categories$!: Observable<CategoryResponse[]>;
  @Select(PostState.getPostByCategory) posts$!: Observable<PostsResponse[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new postCategoryAction.GetAllCategory()).subscribe();
    this.categories$.subscribe(categories => this.categories = categories);

    if (this.id !== 0) {
      this.fetchPostsByCategory(this.id);
    }
  }

  selectCategory(id: number): void {
    console.log(id);
    this.selectedCategoryId = id;
    this.id = id;
    this.fetchPostsByCategory(id);
  }

  private fetchPostsByCategory(id: number): void {
    this.store.dispatch(new postAction.GetPostByCategory(id)).subscribe();
    this.posts$.subscribe(posts => this.posts = posts);
  }
}
