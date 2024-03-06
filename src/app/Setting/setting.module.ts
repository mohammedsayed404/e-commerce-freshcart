import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../Shared/Services/register.service';
import { UpdatepasswordComponent } from './Components/updatepassword/updatepassword.component';
import { SettingRoutingModule } from './setting-routing.module';


@NgModule({
  declarations: [
    UpdatepasswordComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
  ],
  providers:[
    RegisterService,
    // { provide:HTTP_INTERCEPTORS , useClass:MyhttpInterceptor , multi:true}
  ]
})
export class SettingModule { }
