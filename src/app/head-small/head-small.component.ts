import { Component, OnInit, Input } from '@angular/core';
import { UserComponent } from '../user/user.component'

@Component({
  selector: 'bc-head-small',
  templateUrl: './head-small.component.html',
  styleUrls: ['./head-small.component.scss']
})
export class HeadSmallComponent implements OnInit {
  @Input() photoUrl: string;
  constructor() { }
  
  ngOnInit(): void {
  }

}
