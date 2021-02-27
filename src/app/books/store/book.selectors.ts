import { createFeatureSelector, createSelector } from '@ngrx/store';
import { bookFeature, BookState } from './book.reducer';

const bookFeatureSelector = createFeatureSelector<BookState>(bookFeature);

const bookList = createSelector(bookFeatureSelector, (state) => state.bookList);

const bookCount = createSelector(
  bookFeatureSelector,
  (state) => state.bookCount
);

const bookFilters = createSelector(
  bookFeatureSelector,
  (state) => state.bookFilters
);

const bookPagination = createSelector(
  bookFeatureSelector,
  (state) => state.bookPagination
);

export const bookSelectors = {
  bookList,
  bookCount,
  bookFilters,
  bookPagination,
};
