import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookFiltersComponent } from './book-filters/book-filters.component';
import { BookListComponent } from './book-list/book-list.component';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BookService } from './services/book.service';
import { BookFacade } from './store/book.facade';


@NgModule({
  declarations: [BooksComponent, BookListComponent, BookFiltersComponent],
  imports: [CommonModule, BooksRoutingModule],
  providers: [BookService, BookFacade],
})
export class BooksModule {}
