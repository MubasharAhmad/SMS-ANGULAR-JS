import { Component, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  isAlertHidden: boolean = true;
  alertMessage: string = "";
  alertType: string = "primary";

  isNavbarOpen: boolean = false;
  firstName: string = '';
  lastName: string = '';
  email: string = "";
  message: string = "";
  firstNameError: string = "";
  emailError: string = "";
  messageError: string = "";
  isSendingMessage: boolean = false;
  
  constructor() {

  }

  ngOnInit(): void {
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  async onSubmit() {
    this.isSendingMessage = true;
    if (this.firstName == "") {
      this.firstNameError = "First Name is required";
    }
    else {
      this.firstNameError = "";
    }

    if (this.email == "") {
      this.emailError = "Email is required";
    }
    else if (!this.validateEmail(this.email)) {
      this.emailError = "Email is invalid";
    }
    else {
      this.emailError = "";
    }

    if (this.message == "") {
      this.messageError = "Password is required";
    }
    else {
      this.messageError = "";
    }

    if (this.firstNameError == "" && this.emailError == "" && this.messageError == "") {
      let data = await fetch("http://localhost:3001/api/other/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          message: this.message
        })
      })
      let res = await data.json();
      if (res.success) {
        this.alertType = "success";
        this.isAlertHidden = false;
        this.alertMessage = res.msg;
      }
      else {
        this.alertType = "danger";
        this.isAlertHidden = false;
        this.alertMessage = res.msg;
      }
    }
    this.isSendingMessage = false;
  }

  validateEmail(email: string) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  handleClose($event: boolean) {
    this.isAlertHidden = $event;
  }
}
