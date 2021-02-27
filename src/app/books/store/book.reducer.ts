import { bookActions } from './book.actions';
import { createReducer, on } from '@ngrx/store';

export const bookFeature = 'book';
export interface BookState {
  bookList: any[];
  bookCount: number;
  bookFilters: any;
  bookPagination: any;
}

const initialState: BookState = {
  bookList: [],
  bookCount: null,
  bookFilters: {
    title_contains: null,
  },
  bookPagination: {
    _start: 1,
    _limit: 2,
  },
};

export const bookReducer = createReducer(
  initialState,
  on(bookActions.setBookList, (state, { bookList }) => ({
    ...state,
    bookList: bookList,
  })),
  on(bookActions.setPagination, (state, { bookPagination }) => ({
    ...state,
    bookPagination: bookPagination,
  })),
  on(bookActions.setBookCount, (state, { bookCount }) => ({
    ...state,
    bookCount: bookCount,
  }))
);
