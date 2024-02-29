import { HttpErrorResponse } from '@angular/common/http';
import { Component ,OnDestroy,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/Shared/Services/register.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements  OnInit,OnDestroy {
  constructor(private _registerService:RegisterService , private _router:Router,private _formBuilder:FormBuilder){}

  errMsg:string = "";
  isLoading:boolean = false;
  loginsubscribe:Subscription = new Subscription();
  // seka:boolean = true;


    // TODO using formGroup normal
  // loginForm:FormGroup = new FormGroup({
  //   email: new FormControl(null,[Validators.required,Validators.email]),
  //   password: new FormControl(null,[Validators.required,Validators.pattern(/^[a-z][a-z0-9]{3,8}$/)]),

  // });

// TODO USING FORMGROUP BUILDER
loginForm:FormGroup =this._formBuilder.group({
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/^[a-z][a-z0-9]{3,8}$/)]],
})






  login(loginFormValues:FormGroup):void{

    // console.log(loginFormValues.value);

    if(loginFormValues.valid){

      this.isLoading = true;
    this.loginsubscribe =  this._registerService.setSignIn(loginFormValues.value).subscribe({
        next:(response) =>{
          if(response.message == "success"){
            localStorage.setItem('eToken',response.token);
            this._registerService.saveUserData();
            this.isLoading = false;
            this._router.navigate(['/home']);
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
      this.loginForm.markAllAsTouched();
    }


  }

 ngOnInit(): void {


 }

 ngOnDestroy(): void {
this.loginsubscribe.unsubscribe()

 }

}
