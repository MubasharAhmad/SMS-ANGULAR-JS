import { Component, OnInit } from '@angular/core';

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
