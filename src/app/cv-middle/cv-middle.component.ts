import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Router,  ActivatedRoute } from '@angular/router';


@Component({
  selector: 'bc-cv-middle',
  templateUrl: './cv-middle.component.html',
  styleUrls: ['./cv-middle.component.scss']
})
export class CvMiddleComponent implements OnInit {
  @Input() PROFILE: object;

  public profile: any;
  constructor(
    private readonly api: ApiService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.api.loadUserByToken(localStorage.getItem("token")).then(data => {
      this.profile=data
      console.log(this.profile); 
    });
  }

  isOur = true;
  isEdit = false;

  toEdit() {
    this.isEdit = true;
  }

  saveChanges(userJson: object) {
    this.api.sendToServer(localStorage.getItem("token"), userJson).then(resp => {
      console.log(resp); 
      this.isEdit = false;
      document.location.href = 'user/' + localStorage.getItem('token');
    });
  }

  cancel() {
    this.isEdit = false;
    document.location.href = 'user/' + localStorage.getItem('token');
  }

  changeDate(obj: object) {
    if (obj['bdate'].includes('-')) return
    if (obj['bdate'].split('.').length < 3) {
      obj['bdate'] = ""
      return
    } 
      obj['bdate'] = obj['bdate'].split('.').reverse().map( elem => {
        if (elem.length < 2)
          return '0' + elem;
        return elem;
    }).join('-');
  }

  saveAvatarAndName() {
    sessionStorage.setItem('ava', this.PROFILE['avatar_photo'])
    sessionStorage.setItem('fName', this.PROFILE['first_name'])
  }
}
