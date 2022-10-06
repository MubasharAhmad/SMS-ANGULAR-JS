import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  alertHidden:string = "hidden";
  alertMessage:string = "";
  email:string = "";
  emailError:string = "";
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
