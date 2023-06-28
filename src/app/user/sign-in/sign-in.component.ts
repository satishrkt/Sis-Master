import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/models/api-service.service';
import { LoginModel } from 'src/app/models/model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  submitted = false;

  user: LoginModel = new LoginModel;
  isLogin : boolean = false;
  loginData !: FormGroup;
  
  constructor(private fb : FormBuilder, private api : ApiServiceService, private router : Router, private loader: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginData = this.fb.group({
      username : this.fb.control('', [Validators.required]),
      password : this.fb.control('', Validators.required)
    })
  }

  get f() { return this.loginData.controls; }


  onLogin(username : any, password : any) {
    if (this.loginData.invalid) {
      return;    
    }
    this.api.userAuthentication(username, password).subscribe((res : any) => {
      this.loader.show();
      if (res.status === 1 && res.msg === "SUCCESS") {
        const token = res.data[0].details[0].token;
        this.submitted = true;
        localStorage.setItem("token", token)
        localStorage.setItem("username", username)
        this.router.navigate(['/home']);
        return res;
      } else {
        console.error("Failed to authenticate user");
      }
    }, error => {
      console.error(error);
    });
  }
}
