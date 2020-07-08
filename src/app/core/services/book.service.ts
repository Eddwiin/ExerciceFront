import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookModel } from '@core/models/book.model';
import { environment } from '@env/environment';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.state';
import * as BookActions from '@core/actions/book.actions';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getBooks(): Observable<BookModel[]> {
    return this.http
      .get<BookModel[]>(`${environment.url}/books`)
      .pipe(
        tap((books: BookModel[]) =>
          this.store.dispatch(new BookActions.AddBooks(books))
        )
      );
  }
}
