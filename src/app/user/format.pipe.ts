import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
    name: 'entries',
    pure: true
})
export class FormatPipe implements PipeTransform {
  transform(obj: object, args?: any) {
      const temp:any = [
          ["Общая информация", []],
          ["Предпочтения", []],
          ["Соцсети", []],
          ["О себе", []]
      ]

      const commonInfo:string[] = [
          "sex",
          "bdate",
          "department",
          "grade",
          "city",
          "purpose",
      ]

      const preferences:string[] = [
          "interests",
          "music",
          "books",
          "movies",
          "games"
      ]

      const social:string[] = [
          "instagram",
          "facebook"
      ]

      for (let i of commonInfo) {
          if (i !== 'bdate')
            temp[0][1].push([i, obj[i] ? obj[i] : null])
          else
            temp[0][1].push([i, obj[i] ? obj[i].
                split('.').
                reverse().
                map( elem => {
                if (elem.length < 2)
                  return '0' + elem;
                return elem;
            }).join('-') : null])
          
      }

      for (let i of preferences) {
          temp[1][1].push([i, obj[i] ? obj[i] : null])
      }
      for (let i of social) {
        temp[2][1].push([i, obj[i] ? obj[i] : null])
      }
      temp[3][1].push(obj["aboutSelf"])

      console.log(temp)
      return temp;
  }
}