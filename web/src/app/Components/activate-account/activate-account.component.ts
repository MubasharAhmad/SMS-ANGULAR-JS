import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  alertHidden: string = "hidden";
  alertMessage: string = "";

  token: string = "";
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.forEach(params => {
      this.token = params['token'];
    });
  }

  async onSubmit() {
    let data = await fetch('http://localhost:3001/api/auth/activate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.token
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
      this.alertMessage = "Your account is activated";
      this.alertHidden = "";
      setTimeout(() => {
        this.alertHidden = "hidden";
        window.location.href = "http://localhost:4200/login";
      }, 4000);
    }
  }
}
