import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html'
})
export class AddSubjectComponent implements OnInit {

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
