import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap,
} from 'rxjs/operators';
import { BookFacade } from './../store/book.facade';

@Component({
  selector: 'app-book-filters',
  templateUrl: './book-filters.component.html',
  styleUrls: ['./book-filters.component.css'],
})
export class BookFiltersComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  bookFilters: FormGroup = this.formBuilder.group({
    title_contains: this.formBuilder.control(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private bookFacade: BookFacade
  ) {}

  ngOnInit(): void {
    const bookFilterSubscription = this.bookFacade.bookFilters$.subscribe(
      (data) => {
        this.bookFilters.setValue(data);
      }
    );

    let searchByTitleSubscription$ = this.bookFilters
      .get('title_contains')
      .valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter((val) => val !== ''),
        tap((val) => console.log(val)),
        tap(() => this.applyFilters())
      )
      .subscribe();

    // const searchTrigger$ = fromEvent(document.getElementById('bookTitleSearch'), 'keyup').pipe(
    //   debounceTime(200),
    //   map((event: any) => event.target.value),
    //   distinctUntilChanged(),
    // filter((val) => val !== ''),
    //   tap(val => console.log(val)),
    //   tap(() => this.applyFilters())
    // ).subscribe()

    this.subscriptions.add(bookFilterSubscription);
    // this.subscriptions.add(searchTrigger$);
    this.subscriptions.add(searchByTitleSubscription$);
  }

  applyFilters() {
    // console.log(this.bookFilters.getRawValue());
    this.bookFacade.setFilters(this.bookFilters.getRawValue());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
