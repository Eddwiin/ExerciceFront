import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingBadgeNotifService } from '@core/services/shopping-badge-notif.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { APP_ROUTES } from '@core/configs/routes.config';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  nbItemsBadge = 0;
  destroyed = new Subject<boolean>();

  constructor(
    private _shoppingBadgeNotif: ShoppingBadgeNotifService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._shoppingBadgeNotif.nbItems$
      .pipe(takeUntil(this.destroyed))
      .subscribe((nb) => (this.nbItemsBadge = nb));
  }

  navigateToHome = () => this.router.navigate([APP_ROUTES.APP_DEFAULT]);
  navigateToShoppingCart = () =>
    this.router.navigate([APP_ROUTES.SHOPPING_CART]);

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
