import { HttpErrorResponse } from '@angular/common/http';
import { Component ,OnDestroy,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/Shared/Services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements  OnDestroy {
  constructor(private _registerService:RegisterService , private _router:Router,private _formBuilder:FormBuilder){}

  errMsg:string = "";
  isLoading:boolean = false;
  registersubscribe:Subscription= new Subscription();

  // TODO using formGroup normal
  // registerForm:FormGroup = new FormGroup({
  //   name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
  //   email: new FormControl('',[Validators.required,Validators.email]),
  //   password: new FormControl('',[Validators.required,Validators.pattern(/^[a-z][a-z0-9]{3,8}$/)]),
  //   rePassword: new FormControl('',[Validators.required]),
  //   phone: new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // },{
  //   validators: [this.confirmPassword]
  // } as FormControlOptions ); //? we use formControlOptions to solve error in ty becuser it expected the function return values
  // as FormControlOptions
// TODO USING FORMGROUP BUILDER

registerForm:FormGroup = this._formBuilder.group({
  name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
  email:['',[Validators.required,Validators.email]],
  password:["",[Validators.required,Validators.pattern(/^[a-z][a-z0-9]{3,8}$/)]],
  rePassword:[""],
  phone:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
} , {
  validators: [this.confirmPassword]
})


// TODO USING RETURN AND ANY DATA TYPE WITH VALIDATION IN REPASSWORD
// confirmPassword(group: any):object|null{
// const password = group.get('password');
// const rePassword = group.get('rePassword');
// if (password?.value != rePassword?.value) {
//   rePassword?.setErrors({
//     mismatch:true
//   })
//   return  {
//     mismatch:true
//   }
// }
// else{
//   return null;

// }
// }

// ? USEING WITHOUT RETURN DATATYPE VAILIDATION
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


  //TODO method to make register to API
  register(registerFormValues:FormGroup):void{

    console.log(registerFormValues.value)
    if(registerFormValues.valid){
      this.isLoading = true;
     this.registersubscribe = this._registerService.setSignUp(registerFormValues.value).subscribe({
        next:(response) =>{
          if(response.message == "success"){

            this.isLoading = false;
            this._router.navigate(['/login']);
          }
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading = false;
          this.errMsg = err.error.message
          console.log(err.error.message);

        }
      })

    }else{
      // console.log('form is not valid');
      this.registerForm.markAllAsTouched();

    }


  }


 ngOnDestroy(): void {
     this.registersubscribe.unsubscribe()
 }

}
