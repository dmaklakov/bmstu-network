import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router,  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bc-exit',
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.scss']
})
export class ExitComponent implements OnInit {
  constructor(
    private readonly api: ApiService,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.api.exitByToken(localStorage.getItem('token')).then(result => {
      localStorage.removeItem('token');
      document.location.href = 'main/';
    });
  }

}
