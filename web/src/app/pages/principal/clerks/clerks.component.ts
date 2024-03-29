import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clerks',
  templateUrl: './clerks.component.html',
})
export class ClerksComponent implements OnInit {
  clerks: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getAllClerks();
  }

  getAllClerks = async () => {
    const response = await fetch(`${environment.API_URL}/api/clerk/getAllClerks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
      }
    });
    const data = await response.json();
    this.clerks = data.clerks;
  }
}
