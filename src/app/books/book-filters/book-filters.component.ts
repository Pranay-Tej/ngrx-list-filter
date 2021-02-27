import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { tap, filter, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    let searchByTitleSubscription$ = this.bookFilters
      .get('title_contains')
      .valueChanges.pipe(
        filter((val) => val !== ''),
        debounceTime(1200),
        tap(() => this.applyFilters())
      )
      .subscribe((data) => console.log(data));
    this.subscriptions.add(searchByTitleSubscription$);
  }

  applyFilters() {
    console.log(this.bookFilters.getRawValue());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
