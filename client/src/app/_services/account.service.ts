import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/User';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);

  baseUrl = 'https://localhost:5001/api/'; //My backend URL

  currentUser = signal<User | null>(null) // initial value (null)

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe( // with pipe i use observable Object
      map(user =>{
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    )
  }
  

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe( // with pipe i use observable Object
      map(user =>{
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    )
  }
}
