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
  errsubcat = false;
  editnewsitem = false;		
	title = '';
	body = '';
  edited_id:string;
  object = '';
  selectCat:string;
  selectSubCat:string;
  categories = [];
  toggleNewsPage;
  news_seen = [];
  sub_cats = [];
  sub_cats_fetch = [];
  constructor(private newsService:NewsService) { }

  ngOnInit() {
    this.newsService.getAllNewsCat().subscribe(cats => this.categories = cats);
    this.selectCat = "select";
    this.selectSubCat = "select";

    this.newsService.getAllNews().subscribe(news => this.news = news);
    this.newsService.getAllNewsSeen().subscribe(newsSeen => {
      for (var i = 0; i < newsSeen.length; i++) {
        this.news_seen.push({news : newsSeen[i].news_id[0],news_seen_id :newsSeen[i]._id});
      }
      console.log(this.news_seen);
    });
    this.newsService.getAllNewsSubCat().subscribe(sub_cat => {
      console.log(sub_cat);
      this.sub_cats = sub_cat;
    });
  }

  //create news item function
  submitNews() {
    var title = this.title;
    var body = this.body;
    var cat_id = this.selectCat;
    var sub_cat_id = this.selectSubCat;
    var id = this.edited_id;

    if (title === '') {
      this.errtitle = true;
    }
    if (body === '') {
      this.errbody = true;
    }
    if (cat_id === "select") {
      this.errcat = true;
    }
    if (sub_cat_id === "select") {
      this.errsubcat = true;
    }
    if (this.editnewsitem && title && body && cat_id && sub_cat_id) {
      var data = JSON.stringify({title:title,body:body,_id:id,cat_id:cat_id,sc_id:sub_cat_id});
      this.newsService.updateNewsItem(data).subscribe(result => {
        this.news = result;
        this.title = '';
        this.body = '';
        this.selectCat = "select";
        this.selectSubCat = "select";
        this.editnewsitem = false;
      });
    }
    if (!this.editnewsitem && title && body && cat_id && sub_cat_id) {
      var data = JSON.stringify({title:title,body:body,cat_id:cat_id,sc_id:sub_cat_id});
      this.newsService.addNewsItem(data).subscribe(result => {
        this.news.push(result);
        // console.log(result);
        this.title = '';
        this.body = '';
        this.selectCat = "select";
        this.selectSubCat = "select";
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
    let cat_id = this.selectCat;
    this.newsService.fetchSubCat(cat_id).subscribe(sub_cat => {
      // console.log(sub_cat);
      this.sub_cats_fetch = sub_cat;
    });
  }

  // On change sub category
  subcatchange() {
    this.errsubcat = false;
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
    this.selectSubCat = news.sc_id;
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
        this.news_seen = [];
        for (var i = 0; i < result.length; i++) {
          this.news_seen.push({news : result[i].news_id[0],news_seen_id :result[i]._id});
        }
      });
    }
  }

}
