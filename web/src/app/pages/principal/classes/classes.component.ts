import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
})
export class ClassesComponent implements OnInit {
  classes: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
