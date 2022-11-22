import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-clerk-sidebar',
  templateUrl: './clerk-sidebar.component.html'
})
export class ClerkSidebarComponent implements OnInit {

  @Output() onHeadingChanged: EventEmitter<string> = new EventEmitter<string>();
  @Input() hidden: string = 'hidden';
  constructor() { }

  ngOnInit(): void {
  }

  changeHeading(heading: string) {
    this.onHeadingChanged.emit(heading);
  }
}
