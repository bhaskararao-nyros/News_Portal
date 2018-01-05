import { Injectable } from '@angular/core';

@Injectable()
export class NewsService {

  constructor() { }
  news = [{title:"Economy looking up, says Jaitley ",body:"Union Finance Minister Arun Jaitley said in the Rajya Sabha"+
  "on Thursday that key economic indicators were showing an upward swing.Mr. Jaitley assured"+
  "the members that a positive impact of the bold reforms like the Goods and Services Tax and"+
  "demonetisation would get reflected in the medium to long term."+
  "However, the Congress attacked the BJP government over what it termed a “gasping” economy.",category:"National",count:1,time:"Friday, January 5, 2018 8:20 AM"}];

  getAllNews() {
  	return this.news;
  }

  updateNewsItem(data) {
  	return new Promise((resolve, reject) => {
  		var news_item = JSON.parse(data);
  		this.news.splice(news_item.index, 1, {title:news_item.title, body:news_item.body, category:news_item.category,count:1, time:news_item.time});
  		resolve(this.news);
  	});
  }

  createNewsItem(data) {
  	return new Promise((resolve, reject) => {
  		var news_item = JSON.parse(data);
  		this.news.push({title:news_item.title, body:news_item.body, category:news_item.category,count:1, time:news_item.time});
  		resolve(this.news);
  	});
  }

}
