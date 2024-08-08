import { JsonPipe, NgIf } from '@angular/common';
import { AccountService } from './../_services/account.service';
import { Component, input, output, EventEmitter, Output, Input, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private AccountService = inject(AccountService)
  private toastr = inject(ToastrService)
  // @Input() usersFormHomeComponent: any; // All of this we can be used
  // usersFormHomeComponent = input.required<any>()
  // @Output() cancelRegister = new EventEmitter(); // All of this we can be used
  cancelRegister = output<boolean>()

  model: any = {}
  registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(){
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })

  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }

  register(){
    console.log(this.registerForm?.value)
    // console.log(this.model)
    // this.AccountService.register(this.model).subscribe({
    //   next: response => {
    //     console.log("register", response)
    //     this.cancel();
    //   },
    //   error: error => this.toastr.error(error.error)
    // })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
