import { Injectable } from '@angular/core';
import { BookModel } from '@core/models/book.model';
import { Observable, from} from 'rxjs';
import * as _ from 'lodash';
import {
  groupBy,
  mergeMap,
  toArray,
  map,
  pluck
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ShoppingCartModel, Offer } from '@core/models/shopping-cart.model';

export type BooksGroupByTitle = {
  book: BookModel;
  qt: number;
};

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private http: HttpClient) {}

  groupByTitle(books: BookModel[]): Observable<BooksGroupByTitle[]> {
    return from(books).pipe(
      groupBy((book) => book.title),
      mergeMap((group) => group.pipe(toArray())),
      map((g) => {
        return {
          book: {
            isbn: g[0].isbn,
            title: g[0].title,
            price: _.sumBy(g, 'price'),
            cover: g[0].cover,
            synopsis: g[0].synopsis,
          },
          qt: g.length,
        };
      }),
      toArray()
    );
  }

  getReduction(ids: string[]): Observable<number> {
    return this.http
      .get<ShoppingCartModel>(
        `${environment.url}/books/${ids.join()}/commercialOffers`
      )
      .pipe(
        map((reduction: ShoppingCartModel) => reduction),
        pluck('offers'),
        map((offer: Offer[]) => Math.max.apply(Math, offer.map((o) => o.value))
      )
    );
  }
}
