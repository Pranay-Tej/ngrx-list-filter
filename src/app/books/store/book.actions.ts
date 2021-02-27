import { createAction, props } from '@ngrx/store';

const loadBookList = createAction('[Book] Load');

const setBookList = createAction('[Book] Set List', props<{ bookList }>());

const loadBookCount = createAction('[Book] Load Total Count');

const setBookCount = createAction(
  '[Book] Set Total Count',
  props<{ bookCount }>()
);

const setPagination = createAction(
  '[Book] Set Pagination',
  props<{ bookPagination }>()
);

const setFilters = createAction('[Book] Set Filters', props<{ bookFilters }>());

const resetPagination = createAction('[Book] Reset Pagination');

export const bookActions = {
  loadBookList,
  setBookList,
  loadBookCount,
  setBookCount,
  setPagination,
  setFilters,
  resetPagination,
};
