import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

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

  onVarifyCode(){

  }

  async resendVarificationCode() {
    await this.sendEmail();
  }


  async sendEmail() {
    const response = await fetch(`${environment.API_URL}/api/auth/varificationEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.email,
        purpose: "ResetPassword"
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
