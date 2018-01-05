import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(news_seen: any, args?: any): any {
  	// console.log(args);
    return news_seen.sort(function(a, b){
        if(a.count < b.count){
            return 1;
        }
    });
  }

}

@Pipe({
  name: 'filter1'
})
export class FilterPipe1 implements PipeTransform {
  transform(news_r: any, searchText: any): any {
  	// console.log(searchText);
    if(searchText == null) return news_r;

    return news_r.filter(function(news){
      return news.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }

}
