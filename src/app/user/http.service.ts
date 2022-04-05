import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
  
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
      
    postData(user: User){
         
        return this.http.post('http://localhost:3000/postuser', user); 
    }
}