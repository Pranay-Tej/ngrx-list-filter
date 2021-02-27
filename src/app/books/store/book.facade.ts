import { bookActions } from './book.actions';
import { bookSelectors } from './book.selectors';
import { BookService } from './../services/book.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class BookFacade {
  constructor(private store: Store) {}
  bookList$ = this.store.select(bookSelectors.bookList);
  bookFilters$ = this.store.select(bookSelectors.bookFilters);
  bookPagination$ = this.store.select(bookSelectors.bookPagination);
  bookCount$ = this.store.select(bookSelectors.bookCount);

  loadBookCount() {
    this.store.dispatch(bookActions.loadBookCount());
  }

  loadBookList() {
    this.store.dispatch(bookActions.loadBookList());
  }

  setFilters(bookFilters) {
    this.store.dispatch(bookActions.setFilters({ bookFilters }));
    this.store.dispatch(bookActions.resetPagination());
    // explicit dispatches
    this.loadBookCount();
    this.loadBookList();
  }

  setPagination(bookPagination) {
    this.store.dispatch(bookActions.setPagination({ bookPagination }));
    // explicit dispatches
    this.loadBookCount();
    this.loadBookList();
  }
}
