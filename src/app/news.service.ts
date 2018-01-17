import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class NewsService {
	url = "http://10.90.90.55:3000";


  constructor(private http: Http) { }


  // Get news on load
  getAllNews() {
    return this.http.get(this.url+"/getNews")
    .map(res => res.json());
  }

  // Get categories on load
  getAllNewsCat() {
  	return this.http.get(this.url+"/getCategories")
    .map(res => res.json());
  }

  // Add news item
  addNewsItem(news) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var url = this.url+"/addNews";

    return this.http.post(url,news,{headers:headers})
    .map(res => res.json());
  }

  // Delete news item
  delNewsItem(news) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = this.url+"/deleteNews";

    return this.http.post(url,news,{headers:headers})
    .map(res => res.json());
  }

  // Update news item
  updateNewsItem(news) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = this.url+"/updateNews";

    return this.http.post(url,news,{headers:headers})
    .map(res => res.json());
  }

  // Sort news by category
  sortNews(cat) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = this.url+"/sortNews";

    return this.http.post(url,cat,{headers:headers})
    .map(res => res.json());
  }

  // Insert news into news seen modal
  addedToNewsSeen(news) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = this.url+"/addtoNewsSeen";

    return this.http.post(url,news,{headers:headers})
    .map(res => res.json());
  }

  // Get all news seen items
  getAllNewsSeen() {
    return this.http.get(this.url+"/getAllNewsSeen")
    .map(res => res.json());
  }

  // Delete News Seen Item
  delNewsSeenItem(news_seen) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = this.url+"/delNewsSeen";

    return this.http.post(url,news_seen,{headers:headers})
    .map(res => res.json());
  }

}
