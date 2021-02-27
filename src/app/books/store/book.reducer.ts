import { bookActions } from './book.actions';
import { createReducer, on } from '@ngrx/store';

export const bookFeature = 'book';
export interface BookState {
  bookList: any[];
  bookCount: number;
  bookFilters: any;
  bookPagination: any;
}

const initialPagination = {
  _start: 0,
  _limit: 5,
};

const initialState: BookState = {
  bookList: [],
  bookCount: null,
  bookFilters: {
    title_contains: null,
  },
  bookPagination: initialPagination,
};

export const bookReducer = createReducer(
  initialState,
  on(bookActions.setBookList, (state, { bookList }) => ({
    ...state,
    bookList: bookList,
  })),
  on(bookActions.setFilters, (state, { bookFilters }) => ({
    ...state,
    bookFilters: bookFilters,
  })),
  on(bookActions.setPagination, (state, { bookPagination }) => ({
    ...state,
    bookPagination: bookPagination,
  })),
  on(bookActions.setBookCount, (state, { bookCount }) => ({
    ...state,
    bookCount: bookCount,
  })),
  on(bookActions.resetPagination, (state) => ({
    ...state,
    bookPagination: initialPagination,
  }))
);
