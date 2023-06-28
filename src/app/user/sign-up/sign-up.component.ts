import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private fb : FormBuilder) { }

  signupData = this.fb.group({
    fname : this.fb.control(''),
    lname : this.fb.control(''),
    email : this.fb.control(''),
    password : this.fb.control('')
  })

  onSignUp() {

  }

}
