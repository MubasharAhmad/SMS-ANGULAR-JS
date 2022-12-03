import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
})
export class ModelComponent implements OnInit {

  @Input() Title:string = "Title";
  @Input() Message:string = "Message";
  @Input() isHidden: string = "hidden";
  @Output() onClose = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  handleClose() {
    this.onClose.emit("hidden");
  }

}
