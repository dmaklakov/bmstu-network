import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bc-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  ngOnInit(): void {
  }

  visible: boolean = true;

  closeBack():void {
    console.log("close");
    this.visible = false;
  }

  openBack():void {
    console.log("HELLO");
    this.visible = true;
  }
}
