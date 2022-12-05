import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-clerk',
  templateUrl: './add-clerk.component.html'
})
export class AddClerkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onBack(): void {
    window.history.back();
  }

  onSubmit(): void {
  }
}
