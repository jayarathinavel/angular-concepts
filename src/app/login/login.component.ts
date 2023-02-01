import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name = '!!!';
  viewMode = 'tab1';
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
        this.toastService.error(error.name);
      }
    })).subscribe(res => {
        if (res.message.type=="SUCCESS") {
          this.sessionId = res.sessionId;
          sessionStorage.setItem(
            'token',
            this.sessionId
          );
          this.toastService.close('loggingIn');
          this.toastService.success(res.message.body)
          this.router.navigateByUrl(this.redirectURL);
        }
        else if (res.message.type=="ERROR") {
          this.toastService.close('loggingIn');
          this.toastService.error(res.message.body);
        }
    });
  }

  loginApi(): Observable<any>{
    let apiURL = environment.apiURL;
    let url = apiURL + '/auth/login';
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
        this.toastService.error(error.name);
      }
    })).subscribe(res => {
        if (res.type=="SUCCESS") {
          this.loginModel.username = this.registerModel.username;
          this.loginModel.password = this.registerModel.password;
          this.registerModel = "";
          this.toastService.close('registering');
          this.toastService.success(res.body);
          this.login();
        }
        else if (res.type=="ERROR") {
          this.toastService.close('registering');
          this.toastService.error(res.body);
        }
    });
  }

  registerApi(): Observable<any>{
    let apiURL = environment.apiURL;
    let url = apiURL + '/auth/register';
    return this.http.post<any>(url, {
      username: this.registerModel.username,
      password: this.registerModel.password
    })
  }
}
