import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthDataService } from '../_services/authdata.service';
import { Router } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy{
  onceSubmited:boolean = false;
  login_error_msg:string = '';
  subs: any;
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]+$')
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })
  constructor(private bs:AuthDataService, private router: Router){
  }
  submitLogin(){
    this.onceSubmited = true;
    //console.log("before send", this.loginForm.value);
    this.login_error_msg = '';
    this.subs = this.bs.getLogin(this.loginForm.value).subscribe({
      next : (response)=>{
        //console.log("response",response);
        if(response.status){
          // do login
          localStorage.setItem('nexuslens_cms_token', response.token);
          this.router.navigate(['/admin']);
          
        }else{
          this.login_error_msg = response.msg;
        }
      },
      error : (error)=>{
        this.login_error_msg = 'Something Went Wrong. Try again';
        //console.log("error", error);
      }
    })
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
