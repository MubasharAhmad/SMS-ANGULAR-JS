import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
})
export class LogoComponent implements OnInit {

  action: string = '/';
  constructor() { }

  ngOnInit(): void {
  }

}
