import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  isAlertHidden: boolean = true;
  alertMessage: string = "";
  alertType:string = "primary";

  email: string = "";
  password: string = "";
  emailError: string = "";
  pwdError: string = "";
  isSigning: boolean = false;

  constructor() {

  }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.isSigning = true;
    if (this.email == "") {
      this.emailError = "Email is required";
    }
    else if (!this.validateEmail(this.email)) {
      this.emailError = "Email is invalid";
    }
    else {
      this.emailError = "";
    }

    if (this.password == "") {
      this.pwdError = "Password is required";
    }
    else {
      this.pwdError = "";
    }

    if (this.emailError == "" && this.pwdError == "") {
      let data = await fetch(`${environment.API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
          platform: navigator.userAgent,
          vendor: navigator.vendor
        })
      })
      let res = await data.json();
      if (res.success) {
        localStorage.setItem("GFS-AUTH-TOKEN", res.authToken);
        window.location.href = res.redirectUrl;
      }
      else {
        this.alertType = "danger";
        this.isAlertHidden = false;
        this.alertMessage = res.msg;
      }
    }
    this.isSigning = false;
  }

  validateEmail(email: string) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  handleAlertClose($event: boolean) {
    this.isAlertHidden = $event;
  }
}
