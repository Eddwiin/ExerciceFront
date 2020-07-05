import { BookModel } from './book.model';

import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface BookState {
  books: BookModel[]
}

export function createInitialState(): BookState {
    return {
        books: []
    }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'book' })
export class BookStore extends Store<BookState> {
    constructor() {
        super(createInitialState());
    }
}