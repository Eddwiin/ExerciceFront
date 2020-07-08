import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.state';
import { of } from 'rxjs';
import { BookModel } from '@core/models/book.model';
import * as ShoppingCartActions from '@core/actions/shopping-cart.actions';
import { ShoppingCartService, BooksGroupByTitle } from '@core/services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  shoppingCart$ = of<BooksGroupByTitle[]>([]);
  constructor(private store: Store<AppState>, private _shoppingCart: ShoppingCartService) { }

  ngOnInit(): void {

     this.shoppingCart$ = this.store.select('shoppingCart').pipe(
      switchMap(this._shoppingCart.groupByTitle)
      );
  }

  removeInShopCart = (book: BookModel) => this.store.dispatch(new ShoppingCartActions.RemoveInShoppingCart(book.isbn))

  ngOnDestroy() {}
}
