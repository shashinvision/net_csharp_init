import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/User';
import { map } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);

  baseUrl = environment.apiUrl; //My backend URL

  currentUser = signal<User | null>(null) // initial value (null)

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe( // with pipe i use observable Object
      map(user =>{
        if(user){
          this.setCurrentUser(user);
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
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }
}
