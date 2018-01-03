import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(news_seen: any, args?: any): any {
  	console.log(args);
    return news_seen.sort(function(a, b){
        if(a.count < b.count){
            return 1;
        }
    });
  }

}
