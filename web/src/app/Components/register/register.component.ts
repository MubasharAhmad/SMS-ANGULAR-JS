import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  alertHidden:string = "hidden";
  alertMessage:string = "Registration Successful";
  alertType:string = "primary";

  nameError: string = "";
  emailError: string = "";
  passwordError: string = "";
  cpasswordError: string = "";

  name: string = "";
  email: string = "";
  password: string = "";
  cpassword: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.name === "") {
      this.nameError = "Name is required";
    }
    else if (this.name.length < 3) {
      this.nameError = "Name must be at least 3 characters";
    }
    else {
      this.nameError = "";
    }

    if (this.email === "") {
      this.emailError = "Email is required";
    }
    // validate email
    else if (!this.validateEmail(this.email)) {
      this.emailError = "Email is invalid";
    }
    else {
      this.emailError = "";
    }

    if (this.password === "") {
      this.passwordError = "Password is required";
    }
    else if (this.password.length < 8 && this.password.length > 0) {
      this.passwordError = "Password must be at least 8 characters";
    }
    else {
      this.passwordError = "";
    }

    if (this.cpassword === "" && this.passwordError === "") {
      this.cpasswordError = "Confirm Password is required";
    }
    else {
      this.cpasswordError = "";
    }

    if (this.password !== this.cpassword && this.password !== "" && this.cpassword !== "") {
      this.cpasswordError = "Password and Confirm Password should be same";
    }
    else if (this.password === this.cpassword && this.password !== "" && this.cpassword !== "") {
      this.cpasswordError = "";
    }

    if (this.nameError === "" && this.emailError === "" && this.passwordError === "" && this.cpasswordError === "") {
      let data = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password,
          cpassword: this.cpassword
        })
      })
      let res = await data.json();
      if (!res.success){
        this.alertMessage = res.msg;
        this.alertHidden = "";
        setTimeout(() => {
          this.alertHidden = "hidden";
        }, 4000);
      }
      else{
        this.alertMessage = "Varify your account through email";
        this.alertHidden = "";
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
