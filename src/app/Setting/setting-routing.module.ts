import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatepasswordComponent } from './Components/updatepassword/updatepassword.component';

const routes: Routes = [
  {path:'', redirectTo:'updatepassword', pathMatch:'full'},
  {path: 'updatepassword', component:UpdatepasswordComponent,title:'Update Password'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
