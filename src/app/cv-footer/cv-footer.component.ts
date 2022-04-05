import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bc-cv-footer',
  templateUrl: './cv-footer.component.html',
  styleUrls: ['./cv-footer.component.scss']
})
export class CvFooterComponent implements OnInit {
  @Input() pics: string[];
  constructor() { }

  ngOnInit(): void {
  }

}
