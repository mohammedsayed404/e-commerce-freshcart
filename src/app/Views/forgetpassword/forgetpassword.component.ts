import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/Shared/Services/register.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent implements OnDestroy {
  isLoading: boolean = false;
  forgotPasswordSubscription: Subscription = new Subscription();
  constructor(
    private _formBuilder: FormBuilder,
    private _registerService: RegisterService,
    private _router:Router,
    private _toastrService:ToastrService
  ) {}

  forgetPasswordForm: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  forgotpassword(forgetPasswordFormValue: FormGroup): void {
    if (forgetPasswordFormValue.valid) {
      this.isLoading = true;
     this.forgotPasswordSubscription=  this._registerService
        .setForgotPassword(forgetPasswordFormValue.value)
        .subscribe({
          next: (response) => {
            if (response.statusMsg == 'success') {
              this.isLoading = false;
              this._router.navigate(['/verify-code']);

            }
          },
          error: (err:HttpErrorResponse) =>{
            this.isLoading = false;
              this._toastrService.error(err.error.message)
          }
        });
    }
  }
  ngOnDestroy(): void {
    this.forgotPasswordSubscription.unsubscribe();
  }
}
