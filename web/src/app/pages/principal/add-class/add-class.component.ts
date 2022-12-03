import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html'
})
export class AddClassComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onBack(): void {
    // TODO: Navigate to the previous page
    window.history.back();
  }

  onSubmit(): void {
    console.log('submit');
  }
}
