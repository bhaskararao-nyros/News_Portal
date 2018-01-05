import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as moment from 'moment';
import { FilterPipe } from '../filter.pipe';
import { FilterPipe1 } from '../filter.pipe';
import {FormControl} from '@angular/forms';

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

      //visited news array
      news_seen = [{title:"Federer, Nadal shine as injured rivals hobble into 2018 ",
            body:"Written off as dead men walking, Roger Federer and Rafael Nadal"+
             "defied time to sweep the Grand Slams in 2017 while the injury curse"+
             "which dogged their rivals looks set to be the new year’s early storyline",
            category:"Sports",count:1,time:"Thursday, January 4, 2018 5:12 PM"},
            {title:"Shimla to see a grand swearing-in",
             body:"For the first time, a Chief Minister of Himachal Pradesh will be sworn"+
             "in before an audience of the Prime Minister, several Union Ministers and around"+
             "a dozen Chief Ministers.",
             category:"National",count:1,time:"Thursday, January 4, 2018 5:12 PM"}];
      constructor(private modalService: BsModalService) {}

      //calling modal
      openModal(template: TemplateRef<any>,news:any) {
        this.modalRef = this.modalService.show(template);
        this.news_modal = news;
        this.count = false;
        if (this.news_seen.length > 0) {
          for (var i = 0; i < this.news_seen.length; i++) {
            if (this.news_seen[i].title === news.title) {
              this.news_seen[i].count++;
              this.count = true;
            }
          }
          if (this.count === false) {
            this.news_seen.push(news);
          }
            //calling pipes filter 
          let filter = new FilterPipe();
          filter.transform(this.news_seen);
 
        } else {
          alert("push1");
          this.news_seen.push(news);
        }
        // console.log(this.news_seen);
      }
  //news categories array
  categories = ["National","International","World","Sports","Entertainment","Technology","Business"]
	//main news items array
  news_r = [{title:"Federer, Nadal shine as injured rivals hobble into 2018 ",
					  body:"Written off as dead men walking, Roger Federer and Rafael Nadal"+
             "defied time to sweep the Grand Slams in 2017 while the injury curse"+
             "which dogged their rivals looks set to be the new year’s early storyline",
            category:"Sports",count:1,time:"Thursday, January 4, 2018 5:12 PM"},
            {title:"Shimla to see a grand swearing-in",
             body:"For the first time, a Chief Minister of Himachal Pradesh will be sworn"+
             "in before an audience of the Prime Minister, several Union Ministers and around"+
             "a dozen Chief Ministers.",
             category:"National",count:1,time:"Thursday, January 4, 2018 5:12 PM"},
            {title:"‘There isn’t going to be a war between India and China today’, says Bertil Lintner",
             body:"Swedish journalist and strategic analyst Bertil Lintner has spent most of his career"+
             "in Asia, writing about India and China and mapping the increasingly contested region the"+
             "two countries share. His book, ‘China’s India War: Collision Course on the Roof of the World’,"+
             "has just been published. Here he speaks about the challenge to India from China in South Asia,"+
             "his research on the 1962 war, and why he thinks there will not be another India-China war,"+
             "even as India firms its counter-alliance in the Indo-Pacific. Excerpts",
            category:"International",count:1,time:"Thursday, January 4, 2018 5:12 PM"},
            {title:"Jadhav’s family harassed: India",
             body:"Jadhav's wife was asked to remove her 'bindi', 'mangal sutra'; mother was not allowed"+
             "to speak in their mother tongue during the meeting, alleges Ministry."+
             "A day after the meeting of former naval officer Kulbhushan Jadhav with his mother and wife"+
             "in Islamabad, India sharply criticised Pakistan for stage-managing what it called an exercise"+
             "that “lacked credibility” and held in an “atmosphere of coercion.”",
            category:"International",count:1,time:"Thursday, January 4, 2018 5:12 PM"},
            {title:"Army carries out cross-border raid, kills 3 Pakistan soldiers",
             body:"Three Pakistani soldiers were killed in a cross-border raid by Indian Army on a"+
             "temporary post across the Line of Control (LoC) on Monday. The raids come just two days after"+
             "four soldiers of a patrol team were killed in an ambush by Pakistan."+
             "“It was a local tactical level action decided by the local commanders. It was a"+
             "short distance raid about 200-300 metres inside the LoC on a patrol team at a"+
             "temporary post,” a senior officer said on Monday.",
            category:"National",count:1,time:"Thursday, January 4, 2018 5:12 PM"},
            {title:"Rajinikanth to announce his decision on entering politics on December 31",
             body:"After more than two decades of uncertainty, actor Rajinikanth on Tuesday"+
             "announced that he will reveal his political ambitions on December 31."+
             "I will reveal my decision on December 31.I am hesitating because I know the"+
             "problems that come with entering politics,he said at a meet-and-greet event with"+
             "fans in Raghavendra Kalyanamandapam in Chenna.I have not said I will enter politics"+
             "but only that I will reveal my decision on December 31,he said.",
            category:"Entertainment",count:1,time:"Thursday, January 4, 2018 5:12 PM"},
            {title:"Google Doodle celebrates Mirza Ghalib’s 220th birth anniversary",
             body:"Mirza Ghalib, whose contribution to Urdu literature was perhaps as"+
             "significant as that of Shakespeare to English, was born in Agra on December 27."+
             "Honoured with titles likeDabir-ul-Mulk and Najm-ud-Daula, he is widely regarded as"+
             "the last great poet of the Mughal era.",
            category:"World",count:1,time:"Thursday, January 4, 2018 5:12 PM"},
            {title:"96 flight schedules disrupted at KIA",
             body:" Dense fog continued to disrupt air travellers’ plans, with 96 flight schedules"+
             "at the Kempegowda International Airport (KIA) impacted on Tuesday."+
             "Flights were suspended between 4.37 a.m. and 7.49 a.m., leading to four diversions to"+
             "Chennai, and delays in 28 arrivals and 55 departures. Five departures and four arrivals had to be cancelled.",
            category:"Business",count:1,time:"Thursday, January 4, 2018 5:12 PM"},
            {title:"Hyderabad welcomes ‘Robocop’ prototype",
             body:"Hyderabad may soon get its first ‘robocop’, with the launch of a prototype in the city on Friday."+
             "Unlike its famous Hollywood counterpart, however, this five-foot-seven-inch tall ‘smart police robot’,"+
             "weighing 43 kg, is not yet capable of chasing down criminals."+
             "But according to its makers, it can take complaints, record audio and video clips,"+
             "identify suspects, detect metals, and monitor temperature.",
            category:"Technology",count:1,time:"Thursday, January 4, 2018 5:12 PM"}];
	news_sort = [];


  ngOnInit() {
    if (localStorage.records) {
      var data = JSON.parse(localStorage.records);
      for (var i = 0; i < data.length ; i++) {
        this.news_r.push(data[i]);
      }
      console.log(this.news_r);
    }
  }
//categorize news by categories

  sortNewsItems(cat,index) {
    this.toggleClass = cat;
    var newsItem = [];
    for (var i = this.news_r.length - 1; i >= 0; i--) {
      if (this.news_r[i].category === cat) {
        newsItem.push(this.news_r[i]);
        this.news_sort = [];
        for (var j = newsItem.length - 1; j >= 0; j--) {
          this.news_sort.push(newsItem[j]);
        }
        this.sortNews = true;
      }
    }
  }
}

