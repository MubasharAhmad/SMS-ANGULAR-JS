import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-principal-sidebar',
  templateUrl: './principal-sidebar.component.html',
})
export class PrincipalSidebarComponent implements OnInit {

  @Output() onHeadingChanged: EventEmitter<string> = new EventEmitter<string>();
  @Input() hidden: string = 'hidden';
  constructor() { }

  ngOnInit(): void {
  }

  changeHeading(heading: string) {
    this.onHeadingChanged.emit(heading);
  }
}
