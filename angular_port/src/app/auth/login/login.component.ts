import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../_services/common.service';

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
export class LoginComponent {
  onceSubmited:boolean = true;
  login_error_msg:string = '';
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]+$')
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })
  constructor(private bs:CommonService){
  }
  submitLogin(){
    this.onceSubmited = true;
    //console.log("before send", this.loginForm.value);
    this.login_error_msg = '';
    this.bs.getLogin(this.loginForm.value).subscribe(response=>{
      //console.log("response",response);
      if(response.status){
        // do login
        localStorage.setItem('nexuslens_cms_token', response.token);
      }else{
        this.login_error_msg = response.msg;
      }
    },error=>{
      this.login_error_msg = 'Something Went Wrong. Try again';
      //console.log("error", error);
    })
  }
}
