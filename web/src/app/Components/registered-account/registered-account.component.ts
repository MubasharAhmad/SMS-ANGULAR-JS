import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registered-account',
  templateUrl: './registered-account.component.html'
})
export class RegisteredAccountComponent implements OnInit {

  isAlertHidden: boolean = true;
  alertMessage: string = "";
  alertType: string = "success";

  constructor() { }

  ngOnInit(): void {
  }

  async onSubmit() {
   
  }

  handleClose($event: boolean) {
    this.isAlertHidden = $event;
  }
}
