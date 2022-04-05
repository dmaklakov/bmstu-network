import { Component, OnInit, Directive, Input, NgModule } from '@angular/core';

@Directive({
  selector: "[color]"
})
export class ColorDirective {
  @Input('color') color: string;
  
  ngOnInit() {
    console.log(this.color);
  }
}



@Component({
  selector: 'bc-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit {
 
  getAva() {
    return sessionStorage.getItem('ava');
  }

  getName() {
    return sessionStorage.getItem('fName');
  }

  tagArray: string[] = [
    "музыка",
    "кино",
    "книги",
    "спорт",
    "технологии",
    "развлечения",
    "путешествия",
    "животные",
    "наука",
    "история",
    "еда",
    "природа",
    "мода",
  ]

  clickArray: object = {
    "музыка": 0,
    "кино": 0,
    "книги": 0,
    "спорт": 0,
    "технологии": 0,
    "развлечения": 0,
    "путешествия": 0,
    "животные": 0,
    "наука": 0,
    "история": 0,
    "еда": 0,
    "природа": 0,
    "мода": 0,
  }
  darken = 'purple'
  lighten = 'white'

  test() {
    this.clickArray[0] = !this.clickArray[0]
    console.log(this.clickArray)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
