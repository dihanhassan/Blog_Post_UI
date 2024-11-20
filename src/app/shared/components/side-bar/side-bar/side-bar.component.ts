import { Component, OnInit } from '@angular/core';
import { CategoryResponse } from '../../../api-models';
import { Select, select, Store } from '@ngxs/store';
import { CategoryState } from '../../../../store/category/category.state';
import { Observable } from 'rxjs';
import { postCategoryAction } from '../../../../store/category/category.action';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {
  categories : CategoryResponse[] = [];

  @Select(CategoryState.getAllCategories) categories$!: Observable<CategoryResponse[]>;
  constructor(private store : Store){}

  ngOnInit(): void {
    this.store.dispatch(new postCategoryAction.GetAllCategory()).subscribe();
    this.categories$.subscribe(x=>this.categories = x);
    console.log(this.categories);
  }
   
}
