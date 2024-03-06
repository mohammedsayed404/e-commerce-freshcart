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
import { CategoryDetailsComponent } from './Views/category-details/category-details.component';
import { BrandDetailsComponent } from './Views/brand-details/brand-details.component';

const routes: Routes = [
  {
    path: '',
    canActivate:[authGuard],
    component: BlankLayoutComponent,
    children: [
      {path:'', redirectTo:'home', pathMatch:'full'},
      { path: 'home', component: HomeComponent ,title:'FreshCart'},
      { path: 'cart', component: CartComponent ,title:'Cart'},
      { path: 'wishlist', component: WishlistComponent,title:'Wishlist'},
      { path: 'createorder/:id', component: CreateorderComponent ,title:'Make Order'},
      { path: 'allorders', component: AllordersComponent ,title:'All Orders'},
      { path: 'products', component: ProductsComponent ,title:'Products'},
      { path: 'details/:id', component: ProductDetailsComponent ,title:'Product Details'},
      { path: 'categories', component: CategoriesComponent , title:'Category' },
      { path: 'category-details/:id', component: CategoryDetailsComponent ,title:'Category Details'},
      { path: 'brands', component: BrandsComponent , title:'Brands' },
      { path: 'brand-details/:id', component: BrandDetailsComponent ,title:'Brand Details'},
      { path:'setting' ,loadChildren:()=> import('./Setting/setting.module').then((m)=>m.SettingModule)},
      // { path: '**', component: NotFoundComponent },
    ],
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'register', component: RegisterComponent , title:'Register' },
      { path: 'login', component: LoginComponent , title:'Login' },
      { path: 'forget-password', component: ForgetpasswordComponent , title:'Forget Password' },
      { path: 'verify-code', component: VerifycodeComponent , title:'Verify Code' },
      { path: 'reset-password', component: ResetpasswordComponent  , title:'Reset Password' },
      // { path: '**', component: NotFoundComponent },
    ],
  },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:"enabled",useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
