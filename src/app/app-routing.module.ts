import { authGuard } from './Shared/Guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Views/register/register.component';
import { NotFoundComponent } from './Views/not-found/not-found.component';
import { LoginComponent } from './Views/login/login.component';
import { HomeComponent } from './Views/home/home.component';
import { ProductsComponent } from './Views/products/products.component';
import { CartComponent } from './Views/cart/cart.component';
import { CategoriesComponent } from './Views/categories/categories.component';
import { BrandsComponent } from './Views/brands/brands.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { ProductDetailsComponent } from './Views/product-details/product-details.component';
import { CreateorderComponent } from './Views/createorder/createorder.component';
import { AllordersComponent } from './Views/allorders/allorders.component';
import { ForgetpasswordComponent } from './Views/forgetpassword/forgetpassword.component';
import { VerifycodeComponent } from './Views/verifycode/verifycode.component';
import { ResetpasswordComponent } from './Views/resetpassword/resetpassword.component';
import { WishlistComponent } from './Views/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '',
    canActivate:[authGuard],
    component: BlankLayoutComponent,
    children: [
      {path:'', redirectTo:'home', pathMatch:'full'},
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'createorder/:id', component: CreateorderComponent },
      { path: 'allorders', component: AllordersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'details/:id', component: ProductDetailsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'brands', component: BrandsComponent },
      { path:'setting' ,loadChildren:()=> import('./Setting/setting.module').then((m)=>m.SettingModule) },
      // { path: '**', component: NotFoundComponent },
    ],
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forget-password', component: ForgetpasswordComponent },
      { path: 'verify-code', component: VerifycodeComponent },
      { path: 'reset-password', component: ResetpasswordComponent },
      // { path: '**', component: NotFoundComponent },
    ],
  },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
