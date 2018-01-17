import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import * as moment from 'moment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
	news = [];
  now = moment().format('LLLL');
	errtitle = false;
	errbody = false;
  errcat = false;
  editnewsitem = false;		
	title = '';
	body = '';
  edited_id:string;
  object = '';
  selectCat:string;
  categories = [];
  toggleNewsPage;
  news_seen = [];
  constructor(private newsService:NewsService) { }

  ngOnInit() {
    this.newsService.getAllNewsCat().subscribe(cats => this.categories = cats);
    this.selectCat = "select";

    this.newsService.getAllNews().subscribe(news => this.news = news);
    this.newsService.getAllNewsSeen().subscribe(newsSeen => {
      this.news_seen = newsSeen
      console.log(this.news_seen);
    });
  }

  //create news item function
  submitNews() {
    var title = this.title;
    var body = this.body;
    var cat_id = this.selectCat;
    var id = this.edited_id;

    if (title === '') {
      this.errtitle = true;
    }
    if (body === '') {
      this.errbody = true;
    }
    if (cat_id === undefined) {
      this.errcat = true;
    }
    if (this.editnewsitem) {
      var data = JSON.stringify({title:title,body:body,_id:id,cat_id:cat_id});
      this.newsService.updateNewsItem(data).subscribe(result => {
        this.news = result;
        this.title = '';
        this.body = '';
        this.selectCat = "select";
        this.editnewsitem = false;
      });
    } else {
      var data = JSON.stringify({title:title,body:body,cat_id:cat_id});
      this.newsService.addNewsItem(data).subscribe(result => {
        this.news.push(result);
        // console.log(result);
        this.title = '';
        this.body = '';
        this.selectCat = "select";
      })
    }
  }

  //remove error on title change
  titlechange() {
    this.errtitle = false;
  }

  //remove error on category change
  catchange() {
    this.errcat = false;
  }

  //remove error on body change
  bodychange() {
    this.errbody = false;
  }

  //edit news item
  editNewsItem(news) {
    // console.log(n);
    this.title = news.title;
    this.body = news.body;
    this.selectCat = news.cat_id;
    this.editnewsitem = true;
    this.edited_id = news._id;
  }  

  //delete news item
  delNewsItem(news) {
    this.newsService.delNewsItem(news).subscribe(result => {
      // console.log(result);
      this.news = result;
    });
  }

  // Toggle news creation page and most visited news page
  togglePage() {
    this.toggleNewsPage = !this.toggleNewsPage;
  }

  // Delete News Seen Item
  delNewsSeenItem(news_seen) {
    if(window.confirm('Are sure you want to delete this item ?')){
      this.newsService.delNewsSeenItem(news_seen).subscribe(result => {
        console.log(result);
        this.news_seen = result;
      });
    }
  }

}
