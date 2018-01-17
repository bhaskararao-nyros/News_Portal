import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private newsService:NewsService) { }

  ngOnInit() {
  	// this.newsService.getNewsItems().subscribe(news => console.log(news));
  }
}
