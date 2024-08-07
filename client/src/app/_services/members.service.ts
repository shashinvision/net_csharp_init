import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/Member';
// import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private http = inject(HttpClient);
  // private accountService = inject(AccountService);
  baseUrl = environment.apiUrl;

  getMembers() {
    // return this.http.get<Member[]>(this.baseUrl + 'users', this.getHttpOptions());
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username: string) {
    // return this.http.get<Member>(this.baseUrl + 'users/' + username, this.getHttpOptions());
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    // return this.http.put(this.baseUrl + 'users', member, this.getHttpOptions());
    return this.http.put(this.baseUrl + 'users', member);
  }

  // getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + this.accountService.currentUser()?.token
  //     })
  //   }
  // }
}
