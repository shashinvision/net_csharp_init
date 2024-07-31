import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  http = inject(HttpClient);
  private AccountService = inject(AccountService);
  title = 'DatingApp';
  users: any;

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
    
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if(!userString) return;

    const user: User = JSON.parse(userString);
    this.AccountService.currentUser.set(user);
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: reponse =>  this.users = reponse,
      error: error => console.log(error),
      complete: ()=> console.log('Request has completed')
    });
  }
}
