import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/Shared/Services/register.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.scss'],
})
export class UpdatepasswordComponent implements  OnDestroy{
  isLoading: boolean = false;
  errMsg:string = "";
  updatePasswordsubscription: Subscription = new Subscription();
  updatePasswordForm:FormGroup = this._formBuilder.group({
    currentPassword:['',[Validators.required , Validators.pattern(/^[a-z][a-z0-9]{3,8}$/)]],
    password:['',[Validators.required, Validators.pattern(/^[a-z][a-z0-9]{3,8}$/)]],
    rePassword:['',[Validators.required]]
  },{validators:[this.confirmPassword]})
  constructor(
    private _formBuilder: FormBuilder,
    private _registerService: RegisterService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}

  updatePassword(updatePasswordFormValue:FormGroup):void{
      if(updatePasswordFormValue.valid){
        this.isLoading = true;
        this.updatePasswordsubscription = this._registerService.changeMyPassword(updatePasswordFormValue.value).subscribe({
          next:(response)=>{
            if(response.message == 'success'){
                this.isLoading = false;
                localStorage.setItem('eToken',response.token);
                this._registerService.saveUserData()
                this._toastrService.success(`${response.user.name} your password has been updated`)
                this._router.navigate(['/home'])
            }
          },
          error:(err:HttpErrorResponse)=> {
            this.isLoading = false;
            this.errMsg = err.error.errors.msg
            // console.log(err.error.errors.msg);


          },
        })

      }else{
        updatePasswordFormValue.markAllAsTouched();
      }
  }


  confirmPassword(group: FormGroup):void{
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if (rePassword?.value == '') {
       rePassword.setErrors({
        required:true
       });
    }else if (password?.value != rePassword?.value) {


      rePassword?.setErrors({
        mismatch:true
      })

    }
    }


  ngOnDestroy(): void {
    this.updatePasswordsubscription.unsubscribe();
  }
}
