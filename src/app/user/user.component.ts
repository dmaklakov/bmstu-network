import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router,  ActivatedRoute } from '@angular/router';
import {User} from "./user"
import { HttpService} from './http.service';

function test() {
  return 5.5;
}

@Component({
  selector: 'bc-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isOur = true;
  isEdit = false;

  public PROFILE: any;
  constructor(
    private readonly api: ApiService,
    private readonly route: ActivatedRoute,
  ) { 
    
  }

  ngOnInit(): void {
    this.api.loadUserByToken(localStorage.getItem("token")).then(data => {
      this.PROFILE=data
      console.log(this.PROFILE); 
    });
  }

  a:number = test()

saveChanges(userJson: object) {
  this.api.sendToServer(localStorage.getItem("token"), userJson).then(resp => {
    console.log(resp); 
    this.isEdit = false;
    document.location.href = 'user/' + localStorage.getItem('token');
  });
  
  
}

changeDate(obj: object) {
  if(obj['bdate'].includes('.'))
    obj['bdate'] = obj['bdate'].split('.').reverse().map( elem => {
      if (elem.length < 2)
        return '0' + elem;
      return elem;
  }).join('-');
}

toEdit() {
  this.isEdit = true;
}

}