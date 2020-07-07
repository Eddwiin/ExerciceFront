
import * as ShoppingCartAction from '@core/actions/shopping-cart.actions';
import { BookModel } from '@core/models/book.model';

export function shoppingCartReducer(state: BookModel[] = [], action: ShoppingCartAction.Actions) {

    switch(action.type) {
        case ShoppingCartAction.ADD_IN_SHOPPING_CART:
            return [...state, action.payload];

        case ShoppingCartAction.REMOVE_IN_SHOPPING_CART:
            return state.filter(((book: BookModel) => book.isbn !== action.payload));

        default:
            return state;
    }
}