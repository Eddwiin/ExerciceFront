import { BookModel } from '@core/models/book.model';
import { Action } from '@ngrx/store';


export const ADD_BOOKS = '[BOOKS] Add';

export class AddBooks implements Action {
    readonly type = ADD_BOOKS;

    constructor(public payload: BookModel[]) {}
}

export type Actions = AddBooks;
