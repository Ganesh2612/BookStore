import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 constructor(private http: HttpService) {}

  login(payload: any) {
    return this.http.postApi('bookstore_user/login', payload);
  }

  register(payload: any) {
    return this.http.postApi('bookstore_user/registration', payload);
  }
}
