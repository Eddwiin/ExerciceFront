import { BookModel } from '@core/models/book.model';

export interface AppState {
  readonly books: BookModel[];
  readonly shoppingCart: BookModel[];
}
