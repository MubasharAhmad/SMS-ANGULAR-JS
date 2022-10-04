import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  vis:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.vis = !this.vis;
  }

}
