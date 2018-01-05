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
  editnewsitem = false;		
	title = '';
	body = '';
  edit_index:number;
  object = '';
  selectCat:string;
  categories = ["National","International","World","Sports","Entertainment","Technology","Business"];
  constructor(private newsService:NewsService) { }

  ngOnInit() {
    this.news = this.newsService.getAllNews();
    this.selectCat = this.categories[0];
  }

  //create news item function
  submitNews() {
  	var title = this.title;
  	var body = this.body;
    var index = this.edit_index;
    var records = [];
    var data = JSON.stringify({title:title,body:body,index:index,category:this.selectCat,time:this.now});

    
  	if (title == "" && body == "" ) {
  		this.errtitle = true;
  		this.errbody = true;
  	} else if(title == "") {
  		this.errtitle = true;
  	} else if(body == "") {
  		this.errbody = true;
  	} else {
      if (this.editnewsitem) {

        this.newsService.updateNewsItem(data).then((res)=> {
          // console.log(res);
          localStorage.setItem("records", JSON.stringify(res));
          this.editnewsitem = false;
          this.title = '';
          this.body = '';
        },(err)=> {
          console.log(err);
        });
      }
      else {

        this.newsService.createNewsItem(data).then((res)=> {
          // console.log(res);
          localStorage.setItem("records", JSON.stringify(res));
          this.title = '';
          this.body = '';
        },(err)=> {
          console.log(err);
        });
      }
  	}
  }

  titlechange() {
  	this.errtitle = false;
  }
  bodychange() {
  	this.errbody = false;
  }

  //edit news item function
  editNewsItem(n,i) {
    this.title = n.title;
    this.body = n.body;
    this.editnewsitem = true;
    this.object = n;
    this.edit_index = i;
  }

  //delete news item function
  delNewsItem(n,i) {
    this.news.splice(i,1);
  }

}
