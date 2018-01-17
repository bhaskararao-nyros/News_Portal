import { Pipe, PipeTransform } from '@angular/core';

// Sorting most viewed news items block using count
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(news_seen: any, args?: any): any {
  	// console.log(news_seen);
    return news_seen.sort(function(a, b){
        if(a.count < b.count){
            return 1;
        }
    });
  }
}

// Sort news items by date 
