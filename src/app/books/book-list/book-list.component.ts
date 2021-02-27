import { Subscription } from 'rxjs';
import { BookFacade } from './../store/book.facade';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnDestroy {
  bookList$ = this.bookFacade.bookList$;
  bookCount$ = this.bookFacade.bookCount$;
  bookPaginationInfo$;
  subscriptions : Subscription = new Subscription()

  constructor(private bookFacade: BookFacade) {}

  ngOnInit(): void {
    this.bookFacade.loadBookCount();
    this.bookFacade.loadBookList();

    const paginationSubscription = this.bookFacade.bookPagination$.subscribe(
      (data) => { this.bookPaginationInfo$ = data }
    )
    this.subscriptions.add(paginationSubscription)
  }

  setPagination(event) {
    console.log(event);
    this.bookFacade.setPagination({
      _start: (event.pageIndex*event.pageSize),
      _limit: event.pageSize,
    });
  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe()
  }
}
