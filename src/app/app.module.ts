import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Views/home/home.component';
import { CartComponent } from './Views/cart/cart.component';
import { ProductsComponent } from './Views/products/products.component';
import { CategoriesComponent } from './Views/categories/categories.component';
import { BrandsComponent } from './Views/brands/brands.component';
import { NotFoundComponent } from './Views/not-found/not-found.component';
import { FooterComponent } from './Views/footer/footer.component';
import { LoginComponent } from './Views/login/login.component';
import { RegisterComponent } from './Views/register/register.component';
import { ProductDetailsComponent } from './Views/product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBlankComponent } from './Views/nav-blank/nav-blank.component';
import { NavAuthComponent } from './Views/nav-auth/nav-auth.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CuttextPipe } from './Shared/Pipes/cuttext.pipe';
import { SearchPipe } from './Shared/Pipes/search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CreateorderComponent } from './Views/createorder/createorder.component';
import { AllordersComponent } from './Views/allorders/allorders.component';
import { MyhttpInterceptor } from './Shared/Interceptores/myhttp.interceptor';
import { ForgetpasswordComponent } from './Views/forgetpassword/forgetpassword.component';
import { VerifycodeComponent } from './Views/verifycode/verifycode.component';
import { ResetpasswordComponent } from './Views/resetpassword/resetpassword.component';
import { WishlistComponent } from './Views/wishlist/wishlist.component';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    NotFoundComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailsComponent,
    NavBlankComponent,
    NavAuthComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    CuttextPipe,
    SearchPipe,
    CreateorderComponent,
    AllordersComponent,
    ForgetpasswordComponent,
    VerifycodeComponent,
    ResetpasswordComponent,
    WishlistComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers: [{ provide:HTTP_INTERCEPTORS , useClass:MyhttpInterceptor , multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
