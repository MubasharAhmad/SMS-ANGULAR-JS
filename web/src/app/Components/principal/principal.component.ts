import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
})
export class PrincipalComponent implements OnInit {

  heading: string = "Dashboard";
  constructor() { }

  ngOnInit(): void {
  }

  changeHeading(heading: string) {
    this.heading = heading;
  }

}
