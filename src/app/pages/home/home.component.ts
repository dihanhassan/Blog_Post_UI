import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { PostState } from '../../store/posts/post.state';
import { Observable } from 'rxjs';
import { PostsResponse } from '../../shared/api-models/response/post/post-response.model';
import { postCategoryAction } from '../../store/category/category.action';
import { postAction } from '../../store/posts/post.action';
import { HelperUtils } from '../../shared/utils/helper.utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  blogPosts: PostsResponse[] = [];

  @Select(PostState.getAllPosts) posts$!: Observable<PostsResponse[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new postAction.GetAllPosts).subscribe();
    this.posts$.subscribe(posts => {
      this.blogPosts = posts; // Keep the 'createdOn' as a Date object
    });
    this.store.dispatch(new postCategoryAction.GetAllPostCategory()).subscribe();
  }

  // Convert the date to Bangla
  // convertToBanglaDate(englishDate: Date): string {
  //   const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  //   const banglaMonths = [
  //     'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  //     'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  //   ];

  //   const date = new Date(englishDate);  // 'englishDate' is a Date object now

  //   const day = date.getDate();
  //   const month = date.getMonth();
  //   const year = date.getFullYear();
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();

  //   const convertToBanglaDigits = (num: number): string =>
  //     num.toString().split('').map(digit => banglaDigits[parseInt(digit)]).join('');

  //   return `${convertToBanglaDigits(day)} ${banglaMonths[month]} ${convertToBanglaDigits(year)}`;
  // }

  convertToBanglaDate(englishDate: Date): string {
    return HelperUtils.convertToBanglaDate(englishDate);
  }

  truncateContent(content: string | null | undefined, maxWords: number): string {
    const safeContent = content ?? ''; // Use an empty string if content is null or undefined
    const words = safeContent.split(' ');
    return words.length > maxWords
      ? words.slice(0, maxWords).join(' ') + '...'
      : safeContent;
  }
}
