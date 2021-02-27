import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { BookFiltersComponent } from './book-filters/book-filters.component';
import { BookListComponent } from './book-list/book-list.component';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BookService } from './services/book.service';
import { BookFacade } from './store/book.facade';
import { bookFeature, bookReducer } from './store/book.reducer';
import { BookEffects } from './store/book.effects';

@NgModule({
  declarations: [BookFiltersComponent, BookListComponent, BooksComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(bookFeature, bookReducer),
    EffectsModule.forFeature([BookEffects]),
  ],
  providers: [BookService, BookFacade],
})
export class BooksModule {}
