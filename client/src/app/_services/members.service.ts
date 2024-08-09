import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/Member';
import { of, tap } from 'rxjs';
import { Photo } from '../_models/Photo';
import { PaginatedResult } from '../_models/Pagination';
// import { AccountService } from './account.service';
import { UserParams } from '../_models/UserParams';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private http = inject(HttpClient);
  // private accountService = inject(AccountService);
  baseUrl = environment.apiUrl;
  // members = signal<Member[]>([])
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null)

  getMembers(userParams: UserParams) {
    let params = this.setPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);

    // return this.http.get<Member[]>(this.baseUrl + 'users', this.getHttpOptions());
    // next: members => this.members.set(members)
    return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response', params}).subscribe({
      next: response => {
        this.paginatedResult.set({
          items: response.body as Member[],
          pagination: JSON.parse(response.headers.get('Pagination')!)
        })
      }
    });
  }

  private setPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    if(pageNumber && pageSize) {
      params = params.append('pageNumber', pageNumber)
      params = params.append('pageSize', pageSize)
    }

    return params;
  }

  getMember(username: string) {
    // const member = this.members().find(x => x.username === username)
    // if(member !== undefined) return of(member);


    // return this.http.get<Member>(this.baseUrl + 'users/' + username, this.getHttpOptions());
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    // return this.http.put(this.baseUrl + 'users', member, this.getHttpOptions());
    return this.http.put(this.baseUrl + 'users', member).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => {
      //     if(m.username === member.username) return member;
      //     return m
      //   }))
      // })
    );
  }

  setMainPhoto(photo: Photo) {
    // return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {}, this.getHttpOptions());
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photo.id, {}).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => {
      //     if(m.photos.includes(photo))  {
      //       m.photoUrl = photo.url;
      //     };
      //     return m;
      //   }))
      // })
    );
  }

  delelePhoto(photo: Photo) {
    // return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId, this.getHttpOptions());
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photo.id).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => {
      //     if(m.photos.includes(photo))  {
      //       m.photos = m.photos.filter(x => x.id !== photo.id);
      //     };
      //     return m;
      //   }))
      // })
    );
  }

  // getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + this.accountService.currentUser()?.token
  //     })
  //   }
  // }
}
