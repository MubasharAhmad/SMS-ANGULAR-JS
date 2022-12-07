import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html'
})
export class AddAttendanceComponent implements OnInit {
  date: string = "";
  dateError: string = "";
  staffMembers: any = [
    {
      id: 1,
      name: 'John Doe',
      email: 'jon',
      role: 'Teacher',
      attendance: 'present',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'jon',
      role: 'Teacher',
      attendance: 'present',
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'jon',
      role: 'Teacher',
      attendance: 'present',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onBack() {
    history.back();
  }

  markPresent(member: any) {
    // find the member in the array and update the attendance
    this.staffMembers.forEach((m: any) => {
      if (m.id === member.id) {
        m.attendance = 'present';
      }
    });
  }

  markLeave(member: any) {
    member.attendance = 'leave';
  }

  markAbsent(member: any) {
    member.attendance = 'absent';
  }

  onSubmit() {
    console.log('submit');
  }

}
