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
      toggleClass;
      searchText:string;
      count = false;
      clickOnCat = false;
      subCatId;
      modalRef: BsModalRef;
      news_modal:any;
      indexa;
      news_r=[];
      search_array = [];
      marquee_array = [];
      categories = [];
      sub_cats_fetch = [];
      sub_cats = [];
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
          console.log(result);
          if (result instanceof Array) {
            this.news_seen = [];
            for (var i = 0; i < result.length; i++) {
              this.news_seen.push({news:result[i].news_id[0],count:result[i].count});
            }
          } else {
            this.news_seen.push({news:result});
          }
        });

       // Calling filters
       let filter = new FilterPipe();
       filter.transform(this.news_seen);
      }

  ngOnInit() {
    // Get all news items
    this.newsService.getAllNews().subscribe(news => {
      this.news_r = news;
      this.search_array = news;
      this.marquee_array = news;
      // console.log(news);/
    });

    // Get all news categories
    this.newsService.getAllNewsCat().subscribe(cats => this.categories = cats);

    // Get all visited news
    this.newsService.getAllNewsSeen().subscribe(newsSeen => {
      for (var i = 0; i < newsSeen.length; i++) {
        this.news_seen.push({news:newsSeen[i].news_id[0],count:newsSeen[i].count});
      }
      // Calling filters
     let filter = new FilterPipe();
     filter.transform(this.news_seen);
     
    });

    // Get all news sub categories
    this.newsService.getAllNewsSubCat().subscribe(sub_cat => {
      this.sub_cats = sub_cat;
      // console.log(sub_cat);
    });
  }

  // Toggle news items by category
  toggleNewsItems(cat, i) {
    this.subCatId = false;
    if (cat === undefined) {
      this.newsService.getAllNews().subscribe(news => {
        this.news_r = news;
        this.clickOnCat = false;
      });
      this.toggleClass = "all";
    } else {
      this.toggleClass = cat._id;
      this.newsService.fetchSubCat(cat._id).subscribe(sub_cat => {
        // console.log(sub_cat);
        this.sub_cats_fetch = sub_cat;
        if (i === this.indexa) {
          this.clickOnCat = !this.clickOnCat;
          if (!this.clickOnCat) {
            this.toggleClass = false;
          }
          this.indexa = i;
        } else {
          this.clickOnCat = true;
          this.indexa = i;
        }
      });
    }
    
  }

  // Sort news items by sub category
  sortNewsItem(subCat) {
    this.subCatId = subCat._id;
    this.newsService.sortBySubCat(subCat._id).subscribe(news => {
      this.news_r = news;
    });
  }
  // Search news item like auto-complete 
  searchinputchange() {
    this.dataService = this.completerService.local(this.search_array, 'title', 'title');
  }

  // Click on search news items list to get news details
  onNewsItemSelect(selected:CompleterItem) {
    if(selected) {
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

