import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

  @Input() isHidden: boolean = true;
  @Input() message: string = "";
  @Input() type: string = "success";

  @Output() close = new EventEmitter<boolean>();

  constructor() {
    this.message = "";
  }

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit(true);
  }
}
