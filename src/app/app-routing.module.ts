import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { HomeComponent } from './home/home.component';
import { ParentNumberComponent } from './DemoViewChild/parent-number/parent-number.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path:'detail/:id',component: CustomerDetailComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'customer', component: CustomerDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'number', component: ParentNumberComponent}

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
