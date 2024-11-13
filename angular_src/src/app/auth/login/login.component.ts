import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {TuiIcon, TuiTextfield} from '@taiga-ui/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./login.component.less']
})
export class LoginComponent {
  protected readonly testForm = new FormGroup({
      email_address: new FormControl(''),
      password: new FormControl(''),
  });
}
