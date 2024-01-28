import { Component, OnInit } from '@angular/core';
import { SidebarService } from '@core/services/sidebar/sidebar.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(public SidebarService: SidebarService) {}
  ngOnInit(): void {}
}
