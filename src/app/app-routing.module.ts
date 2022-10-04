import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookComponent } from './address-book/address-book.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'address-book', component: AddressBookComponent},
  {path:'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
