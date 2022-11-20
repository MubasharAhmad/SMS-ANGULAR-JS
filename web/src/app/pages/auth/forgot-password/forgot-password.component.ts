import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  isAlertHidden: boolean = true;
  alertMessage: string = "";
  alertType: string = "primary";

  email: string = "";
  emailError: string = "";

  isSendingEmail: boolean = false;

  isEmailSent: boolean = false;

  code: string = "";
  codeError: string = "";

  isVarifingCode: boolean = false;

  constructor() {
    this.isEmailSent = false;
  }

  ngOnInit(): void {
  }

  async onSendEmail() {
    this.isSendingEmail = true;
    await this.sendEmail();
    this.isSendingEmail = false;
  }

  async resendEmail() {
    this.isSendingEmail = true;
    await this.sendEmail();
    this.isSendingEmail = false;
  }

  async sendEmail() {
    const response = await fetch(`${environment.API_URL}/api/auth/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.email,
      })
    });
    const data = await response.json();
    if (data.success) {
      this.isEmailSent = true;
      this.alertMessage = data.msg;
      this.alertType = "success";
      this.isAlertHidden = false;
    }
    else {
      this.alertMessage = data.msg;
      this.alertType = "danger";
      this.isAlertHidden = false;
    }
  }

  handleClose($event: boolean) {
    this.isAlertHidden = $event;
  }
}
