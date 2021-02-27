import { BookService } from './../services/book.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BookFacade {
  private bookList = new Subject();

  bookList$ = this.bookList.asObservable();

  constructor(private bookService: BookService) {}

  loadBookList() {
    this.bookService.getAll().subscribe((data) => this.bookList.next(data));
  }
}
