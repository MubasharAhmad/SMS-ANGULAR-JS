import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
})
export class TeachersComponent implements OnInit {
  teachers: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  getAllTeachers = async () => {
    const response = await fetch(`${environment.API_URL}/api/teacher/getAllTeachers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
      }
    });
    const data = await response.json();
    console.log(data);
    this.teachers = data.teachers;
  }
}
