import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isAlertHidden:boolean = true;
  alertMessage:string = "";
  email:string = "";
  emailError:string = "";
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
