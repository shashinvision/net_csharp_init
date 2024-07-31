import { NgIf } from '@angular/common';
import { AccountService } from './../_services/account.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, NgIf, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService) // I use the inject to inject the service because I need it in the constructor.
  model: any = {} // This model apper in the form .html and i pass with the input data

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    })
  }

  logout(){
    this.accountService.logout();
  }

}
