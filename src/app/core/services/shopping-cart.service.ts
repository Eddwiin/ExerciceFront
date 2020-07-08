import { Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';
import {  Observable, from } from 'rxjs';
import * as _ from 'lodash';
import { groupBy, mergeMap, toArray, map } from 'rxjs/operators';

export type BooksGroupByTitle = {
  book: BookModel,
  qt: number
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }
  groupByTitle(books: BookModel[]): Observable<BooksGroupByTitle[]> {
    return from(books).pipe(
      groupBy(book => book.title),
      mergeMap(group => group.pipe(toArray())),
      map(g => {
        return  {
          book: {
            isbn: g[0].isbn,
            title: g[0].title,
            price: _.sumBy(g, 'price'),
            cover: g[0].cover,
            synopsis: g[0].synopsis,
          },
          qt: g.length
        };
      }),
      toArray()
    );
  }

}
