import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router,  ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'bc-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private code: string
  private querySubscription: Subscription
  public token: string = "HELLO";
  constructor(
    private readonly api: ApiService,
    private readonly route: ActivatedRoute,
  ) { 
    
  }
  
  ngOnInit(): void {
    // code - Заменить на название параметра, которое будет в ссылке от вк
    this.querySubscription = this.route.queryParams.subscribe((queryParam: any) => {
      this.code = queryParam['code'];
    })
    //console.log(this.code);
    this.api.getTokenByCode(this.code).then(result => {
      this.token=result['token'];
      //console.log(this.token);
      localStorage.setItem('token', this.token);
      document.location.href = 'user/' + this.token;  // редирект, в общем
    });
  }

}
