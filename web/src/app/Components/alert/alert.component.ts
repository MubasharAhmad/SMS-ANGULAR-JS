import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() isHidden: boolean = true;
  @Input() message: string = "";
  @Input() type: string = "success";
  constructor() {
    this.message = "";
  }

  ngOnInit(): void {
  }

  onClose() {
    this.isHidden = true;
  }
}
