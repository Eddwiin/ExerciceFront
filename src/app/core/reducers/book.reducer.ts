import { BookModel } from '@core/models/book.model';
import * as BookActions from '@core/actions/book.actions';

export function bookReducer(
  state: BookModel[] = [],
  action: BookActions.Actions
) {
  switch (action.type) {
    case BookActions.ADD_BOOKS:
      return state.concat(action.payload);
    default:
      return state;
  }
}
