import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html'
})
export class AddStudentComponent implements OnInit {
  name: string = "";
  nameError: string = "";
  fatherName: string = "";
  fatherNameError: string = "";
  occupation: string = "";
  occupationError: string = "";
  phone: string = "";
  phoneError: string = "";
  selectedClass: string = "";
  selectedClassError: string = "";
  rollNo: string = "";
  rollNoError: string = "";
  address: string = "";
  addressError: string = "";
  classes: any = [];
  isAlertHidden: boolean = true;
  alertMessage: string = "message";
  alertType: string = "success";

  constructor() { }

  ngOnInit(): void {
    this.getAllClasses();
  }

  onBack(): void {
    window.history.back();
  }

  getAllClasses = async () => {
    const response = await fetch(`${environment.API_URL}/api/class/getClasses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
      }
    });
    const data = await response.json();
    if (data.success) {
      console.log(data._classes);
      this.classes = data._classes;
    }
  };

  onSubmit = async () => {
    this.nameError = "";
    this.fatherNameError = "";
    this.occupationError = "";
    this.phoneError = "";
    this.selectedClassError = "";
    this.rollNoError = "";
    this.addressError = "";
    if (this.name == "") {
      this.nameError = "Name is required";
    }
    if (this.fatherName == "") {
      this.fatherNameError = "Father Name is required";
    }
    if (this.occupation == "") {
      this.occupationError = "Occupation is required";
    }
    if (this.phone == "") {
      this.phoneError = "Phone is required";
    }
    if (this.selectedClass == "") {
      this.selectedClassError = "Class is required";
    }
    if (this.rollNo == "") {
      this.rollNoError = "Roll No is required";
    }
    if (this.address == "") {
      this.addressError = "Address is required";
    }
    if (this.name != "" && this.fatherName != "" && this.occupation != "" && this.phone != "" && this.selectedClass != "" && this.rollNo != "" && this.address != "") {
      const data = await fetch(`${environment.API_URL}/api/student/addStudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("GFS-AUTH-TOKEN")}`
        },
        body: JSON.stringify({
          name: this.name,
          fathername: this.fatherName,
          fatheroccupation: this.occupation,
          phone: this.phone,
          rollnumber: this.rollNo,
          classId: this.selectedClass,
          address: this.address
        })
      });
      const res = await data.json();
      if (res.success) {
        this.alertMessage = res.msg;
        this.alertType = "success";
        this.isAlertHidden = false;
        this.name = "";
        this.fatherName = "";
        this.occupation = "";
        this.phone = "";
        this.selectedClass = "";
        this.rollNo = "";
        this.address = "";

        setTimeout(() => {
          this.onBack();
        }, 1000);
      }
      else {
        this.alertMessage = res.msg;
        this.alertType = "danger";
        this.isAlertHidden = false;
      }
    }
  }
  handleAlertClose($event: boolean) {
    this.isAlertHidden = $event;
  }
}
