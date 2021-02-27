import { BookFacade } from './book.facade';
import { bookSelectors } from './book.selectors';
import { bookActions } from './book.actions';
import { BookService } from './../services/book.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Injectable()
export class BookEffects {
  constructor(
    private actions$: Actions,
    private bookService: BookService,
    private bookFacade: BookFacade
  ) {}

  loadBookList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.loadBookList),
      mergeMap(() =>
        combineLatest([
          this.bookFacade.bookFilters$,
          this.bookFacade.bookPagination$,
        ]).pipe(
          switchMap(([filters, pagination]) =>
            this.bookService
              .getAll(filters, pagination)
              .pipe(
                switchMap((data) => [
                  bookActions.setBookList({ bookList: data }),
                ])
              )
          )
        )
      )
    )
  );

  loadBookCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.loadBookCount),
      withLatestFrom(this.bookFacade.bookFilters$),
      mergeMap(([action, filterList]) =>
        this.bookService
          .getBookCount()
          .pipe(
            switchMap((data) => [bookActions.setBookCount({ bookCount: data })])
          )
      )
    )
  );
}
