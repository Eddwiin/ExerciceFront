import { Component, OnInit } from '@angular/core';
import { BookModel } from '@core/resources/book/book.model';
import { BookService } from '@core/resources/book/book.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {

  books$: Observable<BookModel[]>;
  booksCopy: BookModel[];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.books$ = this.bookService.getBooks()
                    .pipe(
                      map((books: BookModel[]) => this.booksCopy = [...books] )
                    );
  }

  convertBooksForAuto = (books: BookModel[]) => books.map((book: BookModel) =>
             ({ id: book.isbn, label: book.title,  price: book.price, cover: book.cover, synopsis: book.synopsis }) )

  inputChangedEvent = (books: BookModel[]) => this.booksCopy = [...books];

  suggestionSelectedEvent = (book: BookModel) => this.booksCopy = [book];
}
