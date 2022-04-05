import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
	
  constructor() {}
  ngOnInit(): void {
  }

  visible: boolean = true;
  
  public name = localStorage.getItem('card_name')

  closeBack():void {
    console.log("close");
	localStorage.removeItem('card_name');
    this.visible = false;
  }

  openBack():void {
    console.log("HELLO");
    this.visible = true;
  }

  smth(): void { this.visible = true; }

}
