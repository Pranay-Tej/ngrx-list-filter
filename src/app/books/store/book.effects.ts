import { BookFacade } from './book.facade';
import { bookSelectors } from './book.selectors';
import { bookActions } from './book.actions';
import { BookService } from './../services/book.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
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
      withLatestFrom(
        this.bookFacade.bookFilters$,
        this.bookFacade.bookPagination$
      ),
      mergeMap(([actions, filters, pagination]) =>
        this.bookService
          .getAll(filters, pagination)
          .pipe(
            switchMap((data) => [bookActions.setBookList({ bookList: data })])
          )
      )
    )
  );

  // loadBookList$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(bookActions.loadBookList),
  //     mergeMap(() =>
  //       // combileLatest is being triggered without triggering loadBookList
  //       // this is not the desired effect (take(1) in the pipe prevents this)
  //       combineLatest([
  //         this.bookFacade.bookFilters$,
  //         this.bookFacade.bookPagination$,
  //       ]).pipe(
  //         // now the effect will run only when loadBooklist action is dispatched
  //         // combine latest will listen once and stop
  //         // effect will not run when bookFilters$, bookPagination$ is changed
  //         // loadBookList is explicitly dispatched in bookFacade for those
  //         take(1),
  //         // tap(() => console.log('effect')),
  //         switchMap(([filters, pagination]) =>
  //           this.bookService
  //             .getAll(filters, pagination)
  //             .pipe(
  //               switchMap((data) => [
  //                 bookActions.setBookList({ bookList: data }),
  //               ])
  //             )
  //         )
  //       )
  //     )
  //   )
  // );

  loadBookCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.loadBookCount),
      withLatestFrom(this.bookFacade.bookFilters$),
      mergeMap(([action, filter]) =>
        this.bookService
          .getBookCount(filter)
          .pipe(
            switchMap((data) => [bookActions.setBookCount({ bookCount: data })])
          )
      )
    )
  );
}
