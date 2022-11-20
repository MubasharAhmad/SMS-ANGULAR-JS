import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  async onSubmit() {
    this.passwordError = "";
    this.cpasswordError = "";
    if (this.password.length < 8) {
      this.passwordError = "Password must be at least 8 characters long";
      return;
    }
    if (this.password != this.cpassword) {
      this.cpasswordError = "Password and confirm password must be same";
      return;
    }
    let token = window.location.search.split("=")[1];
    if (token) {
      const response = await fetch(`${environment.API_URL}/api/auth/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: token,
          password: this.password,
        })
      });
      const data = await response.json();
      if (data.success) {
        this.alertMessage = data.msg;
        this.alertType = "success";
        this.isAlertHidden = false;

        this.password = "";
        this.cpassword = "";
      }
      else {
        this.alertMessage = data.msg;
        this.alertType = "danger";
        this.isAlertHidden = false;
      }
    }
    else {
      this.alertMessage = "Invalid token";
      this.alertType = "danger";
      this.isAlertHidden = false;
    }
  }

  handleClose($event: boolean) {
    this.isAlertHidden = $event;
  }
}
