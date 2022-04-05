import { Pipe, PipeTransform } from '@angular/core';
import { MapOperator } from 'rxjs/internal/operators/map';
  
@Pipe({
    name: 'mySex'
})
export class SexPipe implements PipeTransform {
  transform(sex: number, args?: any) {

    return (sex === 1) ? 'Ж' : 'М';
  }
}