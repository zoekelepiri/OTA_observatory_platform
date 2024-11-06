import {Component, Input, OnDestroy} from '@angular/core';
import {NavItem} from "../shared/nav-item.model";
import {Subscription} from "rxjs";
import {Event, IsActiveMatchOptions, NavigationEnd, Router} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})
export class NavItemComponent implements OnDestroy {
  @Input() navItemData!: NavItem;
  subscriptions: Subscription[] = [];
  isActive: boolean = false;

  constructor(
    private router: Router,
  ) {
    this.subscriptions.push(
      router.events.subscribe({
        next: (s: Event) => {
          if (s instanceof NavigationEnd) {
            this.checkRouterActive();
          }
        }
      })
    );
    this.checkRouterActive();
  }

  callAction()  {
    this.navItemData.action();
  }

  checkRouterActive() {
    const options: IsActiveMatchOptions = {
      matrixParams: "exact",
      queryParams: "exact",
      paths: "exact",
      fragment: "exact"
    };
    this.isActive = this.navItemData ? this.router.isActive(this.router.createUrlTree(this.navItemData?.path), options) : false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
