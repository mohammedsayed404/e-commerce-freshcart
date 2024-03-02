import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/Shared/Services/register.service';

@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.component.html',
  styleUrls: ['./verifycode.component.scss']
})
export class VerifycodeComponent implements OnDestroy{
  isLoading:boolean = false;
  verifyCodeSubscription: Subscription = new Subscription();
  constructor(
    private _formBuilder: FormBuilder,
    private _registerService: RegisterService,
    private _toastrService:ToastrService,
    private _router:Router,
  ) {}
  verifycodedForm: FormGroup = this._formBuilder.group({
    resetCode: [null, [Validators.required]],
  });
  verifyCode(verifycodedFormValue:FormGroup):void {
    if(verifycodedFormValue.valid){
       this.isLoading = true;
    this.verifyCodeSubscription=  this._registerService.setVerifyResetCode(verifycodedFormValue.value).subscribe({
        next: (response) => {
          if (response.status == 'Success') {
            this.isLoading = false;

            this._router.navigate(['/reset-password']);

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
      this.verifyCodeSubscription.unsubscribe();
  }
}
