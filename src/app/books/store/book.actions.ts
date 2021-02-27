import { createAction, props } from '@ngrx/store';

const loadBookList = createAction('[Book] Load');

const setBookList = createAction('[Book] Set List', props<{ bookList }>());

export const bookActions = {
  loadBookList,
  setBookList
}
