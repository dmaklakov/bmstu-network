import { Pipe, PipeTransform } from '@angular/core';
import { MapOperator } from 'rxjs/internal/operators/map';
  
@Pipe({
    name: 'myDate'
})
export class DatePipe implements PipeTransform {
  transform(str: string, args?: any) {
    const now = new Date(); //Текущя дата
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
    const dob = new Date(str); //Дата рождения
    const dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
    let age = today.getFullYear() - dob.getFullYear()

    if (today < dobnow) {
        age = age-1;
    }
    return age;
  }
}