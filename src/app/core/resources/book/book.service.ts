import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookStore } from './book.store';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { BookModel } from './book.model';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private endPoint = 'books';

    constructor(private bookStore: BookStore, private http: HttpClient) {}

    getBooks(): Observable<BookModel[]> {
        return this.http.get<BookModel[]>(environment.url + this.endPoint)
                .pipe(
                    tap((books: BookModel[]) => this.bookStore.update({ books: [...books] }))
                );
    }
}