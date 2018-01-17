import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as moment from 'moment';
import { FilterPipe } from '../filter.pipe';
import {FormControl} from '@angular/forms';
import { NewsService } from '../news.service';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
      now = moment().format('LLLL');
      sortNews = false;
      toggleClass:string;
      searchText:string;
      count = false;
      modalRef: BsModalRef;
      news_modal:any;
      news_r=[];
      categories = [];
      selectSort = "old";
      scrollAmount:number = 4;

      protected searchStr: string;
      protected dataService: CompleterData;


      //visited news array
      news_seen = [];
      constructor(private modalService: BsModalService, private newsService:NewsService, private completerService: CompleterService) {
      }

      //calling modal
      openModal(template: TemplateRef<any>,news:any) {
        this.modalRef = this.modalService.show(template);
        this.news_modal = news;
        this.newsService.addedToNewsSeen(news).subscribe(result => {
          this.news_seen.push(result);
          console.log(result)
        });

       // Calling filters
       let filter = new FilterPipe();
       filter.transform(this.news_seen);
      }

  ngOnInit() {
    this.newsService.getAllNews().subscribe(news => {
      this.news_r = news;
      // console.log(news);/
    });
    this.newsService.getAllNewsCat().subscribe(cats => this.categories = cats);
    this.newsService.getAllNewsSeen().subscribe(newsSeen => {
      this.news_seen = newsSeen
      console.log(newsSeen);
    });
  }

  // Sort news items by category
  sortNewsItems(cat) {
    if (cat === undefined) {
      this.newsService.getAllNews().subscribe(news => {
        this.news_r = news;
      });
      this.toggleClass = "all";
    } else {
      this.newsService.sortNews(cat).subscribe(result => {
        this.news_r = result;
        this.toggleClass = cat._id;
      });
    }
    
  }

  // Search news item like auto-complete 
  searchinputchange() {
    this.dataService = this.completerService.local(this.news_r, 'title', 'title');
  }

  // Click on search news items list to get news details
  onNewsItemSelect(selected:CompleterItem) {
    if(selected) {
      // console.log(selected.originalObject);
      this.news_r = [];
      this.news_r.push(selected.originalObject);
    }
  }

  // Sort news by latest and oldest
  sortByNewest() {
    if (this.selectSort === "new") {
      this.news_r.sort(function(a,b){
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else {
      this.news_r.sort(function(a,b){
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }
  }

  // Stop marquee on mouse enter
  onMouseEnter() {
    this.scrollAmount = 0;
  }

  // Start marquee on mouse leave
  onMouseLeave() {
    this.scrollAmount = 4;
  }

  // Click on marquee to get news item details
  onClickMarquee(news) {
    this.news_r = [];
    this.news_r.push(news);
  }
}

