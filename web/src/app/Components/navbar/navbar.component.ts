import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  dropdownPopoverShow: string = 'hidden';
  constructor() { }

  @Output() toggleSidebar = new EventEmitter<string>();
  ngOnInit(): void {
  }

  toggleDropdownPopover() {
    if (this.dropdownPopoverShow === 'hidden') {
      this.dropdownPopoverShow = '';
    } else {
      this.dropdownPopoverShow = 'hidden';
    }
    this.toggleSidebar.emit(this.dropdownPopoverShow);
  }

  handleLogout() {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("GFS-AUTH-TOKEN");
      window.location.href = "/login";
    }
  }
}
