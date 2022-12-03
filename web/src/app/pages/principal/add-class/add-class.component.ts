import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html'
})
export class AddClassComponent implements OnInit {
  teachers: any = ["Amjad", "Amjad Farooq"];
  subjects: any = ["SE", "SOFTWARE ENgineering", "Software Engineering"];
  addedSubjects: any = [];

  teacher: string = "";
  subject: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onBack(): void {
    // TODO: Navigate to the previous page
    window.history.back();
  }

  addSubject(): void {
    if(this.teacher === "" || this.subject === "") {
      return;
    }
    this.addedSubjects.push({
      teacher: this.teacher,
      subject: this.subject
    });
    this.subjects = this.subjects.filter((s: any) => s !== this.subject);
    this.teacher = "";
    this.subject = "";
  }

  removeSubject(subject: any): void {
    this.addedSubjects = this.addedSubjects.filter((s: any) => s.subject !== subject);
    this.subjects.push(subject);
  }


  onSubmit(): void {
    console.log('submit');
  }
}