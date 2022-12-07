import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html'
})
export class AddTimetableComponent implements OnInit {
  name: any = "";
  nameError: any = "";
  selectedClass: any = "";
  selectedClassError: any = "";
  selectedSubject: any = "";
  subjectError: any = "";
  startTime: any = "";
  startTimeError: any = "";
  endTime: any = "";
  endTimeError: any = "";
  periodNo: any = "";
  periodNoError: any = "";
  monday: any = false;
  tuesday: any = false;
  wednesday: any = false;
  thursday: any = false;
  friday: any = false;
  saturday: any = false;
  sunday: any = false;
  daysError: any = "";
  classes: any = ["10th", "9th"];
  subjects: any = ["Math-10", "Math-10"];
  timeTable: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  onBack(): void {
    window.history.back();
  }

  onAdd(): void {
    this.periodNoError = "";
    this.subjectError = "";
    this.startTimeError = "";
    this.endTimeError = "";
    this.daysError = "";
    if (this.periodNo == "") {
      this.periodNoError = "Period number is required";
    }
    if (this.selectedSubject == "") {
      this.subjectError = "Subject is required";
    }
    if (this.startTime == "") {
      this.startTimeError = "Start time is required";
    }
    if (this.endTime == "") {
      this.endTimeError = "End time is required";
    }
    if (this.startTime >= this.endTime) {
      this.endTimeError = "End time should be greater than start time";
    }
    if (!this.monday && !this.tuesday && !this.wednesday && !this.thursday && !this.friday && !this.saturday && !this.sunday) {
      this.daysError = "Please select at least one day";
    }
    if (this.periodNoError == "" && this.subjectError == "" && this.startTimeError == "" && this.endTimeError == "" && this.daysError == "") {
      // check if time is already added
      let isAdded = false;
      for (var i = 0; i < this.timeTable.length; i++) {
        if (this.periodNo === this.timeTable[i].periodNo) {
          if (this.monday && this.timeTable[i].monday !== null) {
            this.daysError = "Anyone of selected days already has a time slot";
            break;
          }
          if (this.tuesday && this.timeTable[i].tuesday !== null) {
            this.daysError = "Anyone of selected days already has a time slot";
            break;
          }
          if (this.wednesday && this.timeTable[i].wednesday !== null) {
            this.daysError = "Anyone of selected days already has a time slot";
            break;
          }
          if (this.thursday && this.timeTable[i].thursday !== null) {
            this.daysError = "Anyone of selected days already has a time slot";
            break;
          }
          if (this.friday && this.timeTable[i].friday !== null) {
            this.daysError = "Anyone of selected days already has a time slot";
            break;
          }
          if (this.saturday && this.timeTable[i].saturday !== null) {
            this.daysError = "Anyone of selected days already has a time slot";
            break;
          }
          if (this.sunday && this.timeTable[i].sunday !== null) {
            this.daysError = "Anyone of selected days already has a time slot";
            break;
          }
          if (this.monday) {
            this.timeTable[i].monday = [this.selectedSubject, this.convertTime24to12(this.startTime), this.convertTime24to12(this.endTime)];
          }
          if (this.tuesday) {
            this.timeTable[i].tuesday = [this.selectedSubject, this.convertTime24to12(this.startTime), this.convertTime24to12(this.endTime)];
          }
          if (this.wednesday) {
            this.timeTable[i].wednesday = [this.selectedSubject, this.convertTime24to12(this.startTime), this.convertTime24to12(this.endTime)];
          }
          if (this.thursday) {
            this.timeTable[i].thursday = [this.selectedSubject, this.convertTime24to12(this.startTime), this.convertTime24to12(this.endTime)];
          }
          if (this.friday) {
            this.timeTable[i].friday = [this.selectedSubject, this.convertTime24to12(this.startTime), this.convertTime24to12(this.endTime)];
          }
          if (this.saturday) {
            this.timeTable[i].saturday = [this.selectedSubject, this.convertTime24to12(this.startTime), this.convertTime24to12(this.endTime)];
          }
          if (this.sunday) {
            this.timeTable[i].sunday = [this.selectedSubject, this.convertTime24to12(this.startTime), this.convertTime24to12(this.endTime)];
          }
          isAdded = true;
          this.addedSuccessfully();
          break;
        }
      }

      if (!isAdded && this.daysError == "") {
        this.timeTable.push({
          periodNo: this.periodNo,
          monday: (this.monday) ? [this.selectedSubject, this.convertTime24to12(this.startTime), this.convertTime24to12(this.endTime)] : null,
          tuesday: (this.tuesday) ? [this.selectedSubject, this.convertTime24to12(this.startTime), this.convertTime24to12(this.endTime)] : null,
          wednesday: (this.wednesday) ? [this.selectedSubject, this.convertTime24to12(this.startTime), this.convertTime24to12(this.endTime)] : null,
          thursday: (this.thursday) ? [this.selectedSubject, this.convertTime24to12(this.startTime), this.convertTime24to12(this.endTime)] : null,
          friday: (this.friday) ? [this.selectedSubject, this.convertTime24to12(this.startTime), this.convertTime24to12(this.endTime)] : null,
          saturday: (this.saturday) ? [this.selectedSubject, this.convertTime24to12(this.startTime), this.convertTime24to12(this.endTime)] : null,
          sunday: (this.sunday) ? [this.selectedSubject, this.convertTime24to12(this.startTime), this.convertTime24to12(this.endTime)] : null,
        });
        this.addedSuccessfully();
      }
    }
  }

  convertTime24to12(time24: any): any {
    var tmpArr = time24.split(':'), time12;
    if (+tmpArr[0] === 12) {
      time12 = tmpArr[0] + ':' + tmpArr[1] + ' pm';
    } else {
      if (+tmpArr[0] === 0) {
        time12 = '12:' + tmpArr[1] + ' am';
      } else {
        if (+tmpArr[0] > 12) {
          time12 = (+tmpArr[0] - 12) + ':' + tmpArr[1] + ' pm';
        } else {
          time12 = (+tmpArr[0]) + ':' + tmpArr[1] + ' am';
        }
      }
    }
    return time12;
  }

  addedSuccessfully(): void {
    this.periodNo = "";
    this.selectedSubject = "";
    this.startTime = "";
    this.endTime = "";
    this.monday = false;
    this.tuesday = false;
    this.wednesday = false;
    this.thursday = false;
    this.friday = false;
    this.saturday = false;
    this.sunday = false;
  }

  removeTimeTable(index: any): void {
    this.timeTable.splice(index, 1);
  }

  onSubmit(): void {
    this.nameError = "";
    this.selectedClassError = "";
    if (this.name == "") {
      this.nameError = "Please enter name";
    }
    if (this.selectedClass == "") {
      this.selectedClassError = "Please select class";
    }
    if (this.name != "" && this.selectedClass != "") {
    }
  }
}
