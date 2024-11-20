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
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  blogPosts : PostsResponse[] = [];

  @Select(PostState.getAllPosts) posts$!: Observable<PostsResponse[]>;
  constructor(private store : Store){}
  ngOnInit(): void {
    
    this.store.dispatch(new postAction.GetAllPosts).subscribe();
    this.posts$.subscribe(x=>this.blogPosts = x);
    console.log(this.blogPosts);
  }
  truncateContent(content: string | null | undefined, maxWords: number): string {
    const safeContent = content ?? ''; // Use an empty string if content is null or undefined
    const words = safeContent.split(' ');
    return words.length > maxWords
      ? words.slice(0, maxWords).join(' ') + '...'
      : safeContent;
  }
  
  
  // blogPosts = [
  //   {
  //     title: 'অভিভাবকদের প্রতি',
  //     author: 'Asif Adnan',
  //     content: 'প্রিয় অভিভাবক, সন্তানের মুখের দিকে তাকিয়ে হাসিমুখে জীবনের সব কষ্ট সয়ে নেন পিতা-মাতা। সন্তানের জন্য ফিরিয়ে দেন নিজের শত শখ-আহ্লাদ। কিন্তু সুন্দর ভবিষ্যতের জন্য আপনি দিনের পর দিন যেটে যাচ্ছেন তা-দেব জীবনের যে বিভিন্ন দিক সামাল দিতে করা হয়েছে সুরক্ষিতভবতা - তা কি আপনি জানেন? অধিকাংশই ভুল ধারণা নিয়ে চলেন...',
  //     date: '৯ জানুয়ারী, ২০২৪',
  //     readTime: '10 MIN READ'
  //   },
  //   {
  //     title: 'বিকৃতির সমষ্টি',
  //     author: 'Asif Adnan',
  //     content: '[লেখাটি নেয়া হয়েছে এলজিবিটি আন্দোলন নিয়ে প্রবন্ধিকা (ইবনে মা আসাদ)] এই \'অশ্লীল ফালান\' থেকে ট্রান্সজেন্ডার সর্বত্র মোটামুটি নতুন। আজকাল ছোটোদের ট্রান্সজেন্ডার বলা হচ্ছে। ট্রান্সজেন্ডার হল ট্রান্স-জেন্ডার...',
  //     date: '৮ জানুয়ারী, ২০২৪',
  //     readTime: '8 MIN READ'
  //   },
  //   {
  //     title: 'বিকৃতির সমষ্টি',
  //     author: 'Asif Adnan',
  //     content: '[লেখাটি নেয়া হয়েছে এলজিবিটি আন্দোলন নিয়ে প্রবন্ধিকা (ইবনে মা আসাদ)] এই \'অশ্লীল ফালান\' থেকে ট্রান্সজেন্ডার সর্বত্র মোটামুটি নতুন। আজকাল ছোটোদের ট্রান্সজেন্ডার বলা হচ্ছে। ট্রান্সজেন্ডার হল ট্রান্স-জেন্ডার...',
  //     date: '৮ জানুয়ারী, ২০২৪',
  //     readTime: '8 MIN READ'
  //   },
  //   {
  //     title: 'বিকৃতির সমষ্টি',
  //     author: 'Asif Adnan',
  //     content: '[লেখাটি নেয়া হয়েছে এলজিবিটি আন্দোলন নিয়ে প্রবন্ধিকা (ইবনে মা আসাদ)] এই \'অশ্লীল ফালান\' থেকে ট্রান্সজেন্ডার সর্বত্র মোটামুটি নতুন। আজকাল ছোটোদের ট্রান্সজেন্ডার বলা হচ্ছে। ট্রান্সজেন্ডার হল ট্রান্স-জেন্ডার...',
  //     date: '৮ জানুয়ারী, ২০২৪',
  //     readTime: '8 MIN READ'
  //   },
  //   {
  //     title: 'বিকৃতির সমষ্টি',
  //     author: 'Asif Adnan',
  //     content: '[লেখাটি নেয়া হয়েছে এলজিবিটি আন্দোলন নিয়ে প্রবন্ধিকা (ইবনে মা আসাদ)] এই \'অশ্লীল ফালান\' থেকে ট্রান্সজেন্ডার সর্বত্র মোটামুটি নতুন। আজকাল ছোটোদের ট্রান্সজেন্ডার বলা হচ্ছে। ট্রান্সজেন্ডার হল ট্রান্স-জেন্ডার...',
  //     date: '৮ জানুয়ারী, ২০২৪',
  //     readTime: '8 MIN READ'
  //   },
  //   {
  //     title: 'বিকৃতির সমষ্টি',
  //     author: 'Asif Adnan',
  //     content: '[লেখাটি নেয়া হয়েছে এলজিবিটি আন্দোলন নিয়ে প্রবন্ধিকা (ইবনে মা আসাদ)] এই \'অশ্লীল ফালান\' থেকে ট্রান্সজেন্ডার সর্বত্র মোটামুটি নতুন। আজকাল ছোটোদের ট্রান্সজেন্ডার বলা হচ্ছে। ট্রান্সজেন্ডার হল ট্রান্স-জেন্ডার...',
  //     date: '৮ জানুয়ারী, ২০২৪',
  //     readTime: '8 MIN READ'
  //   },
  //   {
  //     title: 'বিকৃতির সমষ্টি',
  //     author: 'Asif Adnan',
  //     content: '[লেখাটি নেয়া হয়েছে এলজিবিটি আন্দোলন নিয়ে প্রবন্ধিকা (ইবনে মা আসাদ)] এই \'অশ্লীল ফালান\' থেকে ট্রান্সজেন্ডার সর্বত্র মোটামুটি নতুন। আজকাল ছোটোদের ট্রান্সজেন্ডার বলা হচ্ছে। ট্রান্সজেন্ডার হল ট্রান্স-জেন্ডার...',
  //     date: '৮ জানুয়ারী, ২০২৪',
  //     readTime: '8 MIN READ'
  //   },
  //   {
  //     title: 'বিকৃতির সমষ্টি',
  //     author: 'Asif Adnan',
  //     content: '[লেখাটি নেয়া হয়েছে এলজিবিটি আন্দোলন নিয়ে প্রবন্ধিকা (ইবনে মা আসাদ)] এই \'অশ্লীল ফালান\' থেকে ট্রান্সজেন্ডার সর্বত্র মোটামুটি নতুন। আজকাল ছোটোদের ট্রান্সজেন্ডার বলা হচ্ছে। ট্রান্সজেন্ডার হল ট্রান্স-জেন্ডার...',
  //     date: '৮ জানুয়ারী, ২০২৪',
  //     readTime: '8 MIN READ'
  //   },
  //   {
  //     title: 'বিকৃতির সমষ্টি',
  //     author: 'Asif Adnan',
  //     content: '[লেখাটি নেয়া হয়েছে এলজিবিটি আন্দোলন নিয়ে প্রবন্ধিকা (ইবনে মা আসাদ)] এই \'অশ্লীল ফালান\' থেকে ট্রান্সজেন্ডার সর্বত্র মোটামুটি নতুন। আজকাল ছোটোদের ট্রান্সজেন্ডার বলা হচ্ছে। ট্রান্সজেন্ডার হল ট্রান্স-জেন্ডার...',
  //     date: '৮ জানুয়ারী, ২০২৪',
  //     readTime: '8 MIN READ'
  //   },
  //   // Add more posts here
  // ];
}
