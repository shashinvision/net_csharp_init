import { AccountService } from './../_services/account.service';
import { Component, input, output, EventEmitter, Output, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private AccountService = inject(AccountService)
  // @Input() usersFormHomeComponent: any; // All of this we can be used
  // usersFormHomeComponent = input.required<any>()
  // @Output() cancelRegister = new EventEmitter(); // All of this we can be used
  cancelRegister = output<boolean>()

  model: any = {}

  register(){
    // console.log(this.model)
    this.AccountService.register(this.model).subscribe({
      next: response => {
        console.log("register", response)
        this.cancel();
      },
      error: error => console.log(error)
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
