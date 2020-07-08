import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.state';
import { of } from 'rxjs';
import { BookModel } from '@core/models/book.model';
import * as ShoppingCartActions from '@core/actions/shopping-cart.actions';
import { ShoppingCartService, BooksGroupByTitle } from '@core/services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingBadgeNotifService } from '@app/core/services/shopping-badge-notif.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../core/configs/routes.config';

export type DataShoppingCart = {bookGroup: BooksGroupByTitle[], reduction: number, finalPrice: number }

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart$ = of< {bookGroup: BooksGroupByTitle[], reduction: number, finalPrice: number }>();
  totalPrice = 0;

  constructor(  private store: Store<AppState>, private _shoppingCart: ShoppingCartService, private _snackBar: MatSnackBar,
                private _shoppingBadgeNotif: ShoppingBadgeNotifService, private router: Router) { }

  ngOnInit(): void {
    this.shoppingCart$ = this.store.select('shoppingCart').pipe(
      switchMap(this._shoppingCart.groupByTitle),
      switchMap(bookGroup => {

        if (bookGroup.length === 0 ) {
          return this.clearShoppingCart();
        }

        this.totalPrice = _.sumBy(bookGroup.map(shop => ( { price: shop.book.price })), 'price');
        const ids = bookGroup.map((shop) => shop.book.isbn);

        return this._shoppingCart.getFinalAmount(ids, this.totalPrice).pipe(
          switchMap(({ reduction, finalPrice}) => {
            return of({
              bookGroup,
              reduction,
              finalPrice
            });
          })
        );
      })
    );

    this.store.select('shoppingCart').subscribe(console.log);
  }

  clearShoppingCart = () =>  of<DataShoppingCart>({ bookGroup: [], reduction: 0, finalPrice: 0 });

  removeInShopCart(book: BookModel, qt: number): void{
    this.store.dispatch(new ShoppingCartActions.RemoveInShoppingCart(book.isbn));
    this._shoppingBadgeNotif.removeItem(qt);
  }

  submit(): void {
    this._snackBar.open('Félicitation ! Votre achat a été validé.', undefined, {
      duration: 3000
    });

    this.store.dispatch(new ShoppingCartActions.ClearShoppingCart());
    this._shoppingBadgeNotif.clearBadge();
    this.router.navigate([APP_ROUTES.BOOKS]);
  }
}
