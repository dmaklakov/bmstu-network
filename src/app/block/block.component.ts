import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'bc-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() urlImage: string;
  @Input() text_float: string;
  text_left() {
    return this.text_float == "left" ? true : false;
  }

  ngOnInit() {

  }
}
