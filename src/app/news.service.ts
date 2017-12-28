import { Injectable } from '@angular/core';

@Injectable()
export class NewsService {

  constructor() { }
  news = [{title:"Federer, Nadal shine as injured rivals hobble into 2018 ",
            body:"Written off as dead men walking, Roger Federer and Rafael"+
            "Nadal defied time to sweep the Grand Slams in 2017 while the injury"+
            "curse which dogged their rivals looks set to be the new year’s early storyline"},
          {title:"aaaaa",body:"ccccc"}];

  getAllNews() {
  	return this.news;
  }

  updateNewsItem(data) {
  	return new Promise((resolve, reject) => {
  		var news_item = JSON.parse(data);
  		this.news.splice(news_item.index, 1, {title:news_item.title, body:news_item.body});
  		resolve(this.news);
  	});
  }

  createNewsItem(data) {
  	return new Promise((resolve, reject) => {
  		var news_item = JSON.parse(data);
  		this.news.push({title:news_item.title, body:news_item.body});
  		resolve(this.news);
  	});
  }

}
