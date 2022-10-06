import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  alertHidden:string = "hidden";
  alertMessage:string = "";
  password:string = "";
  cpassword:string = "";
  passwordError:string = "";
  cpasswordError:string = "";
  alertType:string = "primary";
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
  }

}
