import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-teacher-sidebar',
  templateUrl: './teacher-sidebar.component.html'
})
export class TeacherSidebarComponent implements OnInit {

  @Output() onHeadingChanged: EventEmitter<string> = new EventEmitter<string>();
  @Input() hidden: string = 'hidden';
  constructor() { }

  ngOnInit(): void {
  }

  changeHeading(heading: string) {
    this.onHeadingChanged.emit(heading);
  }
}
