import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookComponent } from './address-book/address-book.component';
import { HomeComponent } from './home/home.component';
import { LendListComponent } from './lend-tracker/lend-list/lend-list.component';
import { AuthenticationGuard } from './login/authentication.guard';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {path:'address-book', component: AddressBookComponent, canActivate: [AuthenticationGuard]},
  {path:'home', component: HomeComponent},
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'lend-tracker', component: LendListComponent, canActivate: [AuthenticationGuard]},
  {path:'notes', component: NotesComponent, canActivate: [AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
