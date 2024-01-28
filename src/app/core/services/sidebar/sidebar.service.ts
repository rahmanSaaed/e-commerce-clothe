import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  sidebar: boolean = false;
  constructor() {}

  sidebarOverlayToggle() {
    this.sidebar = !this.sidebar;
  }
}
