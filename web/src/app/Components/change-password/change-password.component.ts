import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  isAlertHidden: boolean = true;
  alertMessage: string = "";
  alertType: string = "primary";

  password: string = "";
  cpassword: string = "";
  passwordError: string = "";
  cpasswordError: string = "";
  constructor() {

  }

  ngOnInit(): void {
  }

  onSubmit() {
  }

  handleClose($event: boolean) {
    this.isAlertHidden = $event;
  }
}
