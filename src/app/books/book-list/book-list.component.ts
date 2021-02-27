import { BookFacade } from './../store/book.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  bookList$ = this.bookFacade.bookList$;
  bookCount$ = this.bookFacade.bookCount$;

  constructor(private bookFacade: BookFacade) {}

  ngOnInit(): void {
    this.bookFacade.loadBookCount();
    this.bookFacade.loadBookList();
  }

  setPagination(event) {
    // console.log(event);
    this.bookFacade.setPagination({
      _start: event.pageIndex + 1,
      _limit: event.pageSize,
    });
  }
}
