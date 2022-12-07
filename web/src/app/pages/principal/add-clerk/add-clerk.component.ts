import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-clerk',
  templateUrl: './add-clerk.component.html'
})
export class AddClerkComponent implements OnInit {
  name: any = "";
  nameError: any = "";
  email: any = "";
  emailError: any = "";
  description: any = "";
  descriptionError: any = "";


  constructor() { }

  ngOnInit(): void {
  }

  onBack(): void {
    window.history.back();
  }

  onSubmit(): void {
    this.nameError = "";
    this.emailError = "";
    this.descriptionError = "";
    if (this.name == "") {
      this.nameError = "Name is required";
    }
    if (this.email == "") {
      this.emailError = "Email is required";
    }
    if (this.description == "") {
      this.descriptionError = "Description is required";
    }
    if (this.name != "" && this.email != "" && this.description != "") {
      console.log("Submitted");
    }
  }
}
