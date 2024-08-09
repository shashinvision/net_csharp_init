import { NgIf, TitleCasePipe } from '@angular/common';
import { AccountService } from './../_services/account.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, NgIf, BsDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService) // I use the inject to inject the service because I need it in the constructor.
  private router = inject(Router)
  private toastr = inject(ToastrService)

  model: any = {} // This model apper in the form .html and i pass with the input data
  // ngOnInit() {
  //   console.log('Current User:', this.accountService.currentUser());
  // }
  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        void this.router.navigateByUrl('/members'); // In this case we have a alert in the Angular Server, this is because we need to use void when we don't have a return
      },
      error: error => this.toastr.error(error.error)
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
