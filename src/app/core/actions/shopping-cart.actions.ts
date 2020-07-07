
import { Action } from '@ngrx/store';
import { BookModel } from '../models/book.model';

export const ADD_IN_SHOPPING_CART = '[ITEM] Add in shopping cart';
export const REMOVE_IN_SHOPPING_CART = '[ITEM] Remove in shopping cart';

export class AddInShoppingCart implements Action {
    readonly type = ADD_IN_SHOPPING_CART;
    constructor(public payload: BookModel) {}
}


export class RemoveInShoppingCart implements Action {
    readonly type = REMOVE_IN_SHOPPING_CART;

    constructor(public payload: string) {}
}


export type Actions = AddInShoppingCart | RemoveInShoppingCart;
