import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  alertHidden: string = "hidden";
  alertMessage: string = "";
  emailError: string = "";
  pwdError: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  async onSubmit() {
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
      let data = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })
      let res = await data.json();
      if (res.success) {
        localStorage.setItem("RFS-AUTH-TOKEN", res.authToken);
        window.location.href = "/";
      }
      else {
        this.alertHidden = "";
        this.alertMessage = res.msg;
        setTimeout(() => {
          this.alertHidden = "hidden";
        }, 4000);
      }
    }

  }

  validateEmail(email: string) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

}
