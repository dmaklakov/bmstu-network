import { Pipe, PipeTransform } from '@angular/core';
import { MapOperator } from 'rxjs/internal/operators/map';
  
@Pipe({
    name: 'procDate'
})
export class ProcessDatePipe implements PipeTransform {
  transform(str: string, args?: any) {
      return str.split('.').reverse().map( elem => {
          if (elem.length < 2)
            return '0' + elem;
          return elem;
      }).join('-');
  }
}