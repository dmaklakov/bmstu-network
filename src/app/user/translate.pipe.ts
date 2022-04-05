import { Pipe, PipeTransform } from '@angular/core';
import { MapOperator } from 'rxjs/internal/operators/map';
  
@Pipe({
    name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  transform(str: string, args?: any) {
      const map = new Map();

      const engWords:string[] = [
      "department",
      "grade",
      "bdate",
      "sex",
      "purpose",
      "city",
      "interests",
      "music",
      "books",
      "movies",
      "games",
      "instagram",
      "facebook",
      "aboutSelf"
    ]

      const ruWords:string[] = [
          "Кафедра",
          "Курс",
          "Возраст",
          "Пол",
          "Цель знакомства",
          "Город",
          "Интересы",
          "Любимая музыка",
          "Любимые книги",
          "Любимые фильмы",
          "Любимые игры",
          "Instagram",
          "Facebook",
          "О себе",
      ]


    for(let i = 0; i < ruWords.length; i++)
      map.set(engWords[i], ruWords[i]);

    return map.get(str)
  }
}