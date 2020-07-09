import * as ShoppingCartAction from '@core/actions/shopping-cart.actions';
import { BookModel } from '@core/models/book.model';

const initialState = [];

export function shoppingCartReducer(
  state: BookModel[] = initialState,
  action: ShoppingCartAction.Actions
) {
  switch (action.type) {
    case ShoppingCartAction.ADD_IN_SHOPPING_CART:
      return [...state, action.payload];

    case ShoppingCartAction.REMOVE_IN_SHOPPING_CART:
      return state.filter((book: BookModel) => book.isbn !== action.payload);

    case ShoppingCartAction.CLEAR_SHOPPING_CART:
      return (state = initialState);

    default:
      return state;
  }
}
