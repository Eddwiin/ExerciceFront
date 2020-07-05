import { BookState, BookStore } from './book.store';
import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { BookModel } from './book.model';

@Injectable({ 
    providedIn: 'root'
})
export class BookQuery extends Query<BookModel> {

    constructor(protected bookStore: BookStore) {
        super(bookStore);
    }
}