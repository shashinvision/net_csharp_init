import { JsonPipe, NgIf } from '@angular/common';
import { AccountService } from './../_services/account.service';
import { Component, input, output, EventEmitter, Output, Input, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from "../_forms/date-picker/date-picker.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, TextInputComponent, DatePickerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService)
  private fb = inject(FormBuilder)
  private toastr = inject(ToastrService)
  // @Input() usersFormHomeComponent: any; // All of this we can be used
  // usersFormHomeComponent = input.required<any>()
  // @Output() cancelRegister = new EventEmitter(); // All of this we can be used
  cancelRegister = output<boolean>()
  model: any = {}
  registerForm: FormGroup = new FormGroup({});
  maxDate = new Date();

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
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
