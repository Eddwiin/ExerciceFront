import { Component, OnInit } from '@angular/core';
import { BookModel } from '@core/resources/book/book.model';
import { BookService } from '@core/resources/book/book.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books$: Observable<BookModel[]>;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.books$ = this.bookService.getBooks();
  }

  convertBooksForAuto = (books: BookModel[]) => books.map((book: BookModel) => ({ id: book.isbn, label: book.title }) );

  itemsChangeEvent(items) {}
}
