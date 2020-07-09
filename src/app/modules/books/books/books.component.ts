import { Component, OnInit } from '@angular/core';
import { BookModel } from '@core/models/book.model';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.state';
import { iif, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { BookService } from '@core/services/book.service';
import * as ShoppingCartActions from '@core/actions/shopping-cart.actions';
import { ShoppingBadgeNotifService } from '@core/services/shopping-badge-notif.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutocompleteData } from '@app/shared/autocomplete/autocomplete.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books$: Observable<BookModel[]>;
  booksCopy: BookModel[];

  constructor(
    private _book: BookService,
    private store: Store<AppState>,
    private _shoppingBadgeNotif: ShoppingBadgeNotifService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.books$ = this.store.select('books').pipe(
      mergeMap((books: BookModel[]) =>
        iif(() => books.length === 0, this._book.getBooks(), of(books))
      ),
      map((books: BookModel[]) => (this.booksCopy = [...books]))
    );
  }

  convertBooksForAuto = (books: BookModel[]) =>
    books.map(({ isbn, title, price, cover, synopsis }) => ({
      id: isbn,
      title,
      price,
      cover,
      synopsis,
    }));

  inputChangedEvent = (booksUpdated) =>
    (this.booksCopy = booksUpdated.map(
      ({ id, title, price, cover, synopsis }) => ({
        isbn: id,
        title,
        price,
        cover,
        synopsis,
      })
    ));

  suggestionSelectedEvent = (
    booksOriginal: BookModel[],
    item: AutocompleteData
  ) => (this.booksCopy = booksOriginal.filter((book) => book.isbn === item.id));

  addInShoppingCart(book: BookModel): void {
    this.store.dispatch(new ShoppingCartActions.AddInShoppingCart(book));
    this._shoppingBadgeNotif.addItem();
    this._snackBar.open(
      'Le livre a été ajouté dans votre panier !',
      undefined,
      {
        duration: 1000,
      }
    );
  }
}
