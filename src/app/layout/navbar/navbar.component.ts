import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingBadgeNotifService } from '@core/services/shopping-badge-notif.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/configs/routes.config';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  nbItemsBadge = 0;

  constructor(
    private _shoppingBadgeNotif: ShoppingBadgeNotifService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._shoppingBadgeNotif.nbItems$.subscribe((nb) => {
      this.nbItemsBadge = nb;
    });
  }

  navigateToHome = () => this.router.navigate([APP_ROUTES.APP_DEFAULT]);
  navigateToShoppingCart = () => this.router.navigate([APP_ROUTES.SHOPPING_CART]);
}
