import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: any = {};
  registerModel: any = {};
  sessionId: any = "";
  redirectURL: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastService: HotToastService
  ) {
    this.route.queryParams.subscribe(params => {
      this.redirectURL = params['redirectURL'];
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.toastService.loading("Logging in",{id:'loggingIn'});
    this.loginApi().pipe(tap({
      error: (error:HttpErrorResponse|Error) => {
        this.toastService.close('loggingIn');
        this.toastService.error('Login Failed : ' + error.name);
      }
    })).subscribe(res => {
        if (res) {
          this.sessionId = res.sessionId;
          sessionStorage.setItem(
            'token',
            this.sessionId
          );
          this.toastService.close('loggingIn');
          this.toastService.success("Login Success")
          this.router.navigateByUrl(this.redirectURL);
        }
    });
  }

  loginApi(): Observable<any>{
    let url = 'http://localhost:8080/auth/login';
    return this.http.post<any>(url, {
      username: this.loginModel.username,
      password: this.loginModel.password
    })
  }

  register() {
    this.toastService.loading("Registering",{id:'registering'});
    this.registerApi().pipe(tap({
      error: (error:HttpErrorResponse|Error) => {
        this.toastService.close('registering');
        this.toastService.error('Registering Failed : ' + error.name);
      }
    })).subscribe(res => {
        if (res) {
          this.registerModel = "";
          this.toastService.close('registering');
          this.toastService.success("Register Success <br> Username: "
           + res.username + "<br> Password: "
            + res.password + " <br> You can now Login", { duration: 10000 }
          )
        }
    });
  }

  registerApi(): Observable<any>{
    let url = 'http://localhost:8080/auth/register';
    return this.http.post<any>(url, {
      username: this.registerModel.username,
      password: this.registerModel.password
    })
  }
}
