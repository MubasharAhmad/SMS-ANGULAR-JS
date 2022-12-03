import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clerks',
  templateUrl: './clerks.component.html',
})
export class ClerksComponent implements OnInit {
  clerks: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
