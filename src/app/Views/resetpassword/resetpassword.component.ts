import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/Shared/Services/register.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent {
  isLoading: boolean = false;
  resetPasswordsubscription: Subscription = new Subscription();
  constructor(
    private _formBuilder: FormBuilder,
    private _registerService: RegisterService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}

  resetPasswordForm: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [
      '',
      [Validators.required, Validators.pattern(/^[a-z][a-z0-9]{3,8}$/)],
    ],
  });

  resetPassword(resetPasswordFormValue: FormGroup): void {
    if (resetPasswordFormValue.valid) {
      this.isLoading = true;
      this.resetPasswordsubscription = this._registerService
        .setResetPassword(resetPasswordFormValue.value)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            localStorage.setItem('eToken', response.token);
            this._registerService.saveUserData();
            console.log(response);
            this._router.navigate(['/home']);
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
            this._toastrService.error(err.error.message);
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.resetPasswordsubscription.unsubscribe();
  }
}
