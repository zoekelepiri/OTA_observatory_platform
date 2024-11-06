import { Component } from '@angular/core';
import {NavItem} from "./shared/nav-item.model";
import {NavbarService} from "./shared/navbar.service";
import {NavItemComponent} from "./nav-item/nav-item.component";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NavItemComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  navItems: NavItem[];

  constructor(
    private navbarService: NavbarService,
  ) {
    this.navItems = this.navbarService.navItems;
  }

}
