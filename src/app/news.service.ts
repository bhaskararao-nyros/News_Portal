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
    let url = this.url+"/delNewsSeen/"+news_seen;

    return this.http.get(url,{headers:headers})
    .map(res => res.json());
  }

  // Add category
  addCategory(cat) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = this.url+"/addCat/"+cat;

    return this.http.get(url,{headers:headers})
    .map(res => res.json());
  }

  // Delete category
  deleteCat(cat_id) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = this.url+"/delCat/"+cat_id;

    return this.http.get(url,{headers:headers})
    .map(res => res.json());
  }

  // Edit category 
  editCat(cat_id,catName) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = this.url+"/updateCat/"+cat_id+"/"+catName;

    return this.http.get(url,{headers:headers})
    .map(res => res.json());
  }

  // Add news sub category
  addSubCateogry(cat_id,subCatName) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = this.url+"/addSubCat/"+cat_id+"/"+subCatName;

    return this.http.get(url,{headers:headers})
    .map(res => res.json());
  }

  // Get all news sub categories
  getAllNewsSubCat() {
    return this.http.get(this.url+"/getAllNewsSubCats")
    .map(res => res.json());
  }

  // Get sub categories on select main category
  fetchSubCat(cat_id) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = this.url+"/fetchSubCat/"+cat_id;

    return this.http.get(url,{headers:headers})
    .map(res => res.json());
  }

  // Edit sub category
  editSubCateogry(sub_cat_id,subCatName) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = this.url+"/editSubCat/"+sub_cat_id+"/"+subCatName;

    return this.http.get(url,{headers:headers})
    .map(res => res.json());
  }

  // Delete sub category
  deleteSubCat(sub_cat_id) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = this.url+"/delSubCat/"+sub_cat_id;

    return this.http.get(url,{headers:headers})
    .map(res => res.json());
  }

  // Sort by sub category
  sortBySubCat(sub_cat_id) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    let url = this.url+"/sortNewsBySubCat/"+sub_cat_id;

    return this.http.get(url,{headers:headers})
    .map(res => res.json());
  }
}
