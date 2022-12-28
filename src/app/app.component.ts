import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : []
})
export class AppComponent {
  title = 'angular-concepts';
  
  constructor(
    private router: Router,
    private toastService: HotToastService
    ) { }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('');
    this.toastService.info('You are logged out');
  }

  isLoggedIn(){
    if (sessionStorage.getItem('token')) {
      return true;
    }
    else {
      return false;
    }
  }
}
