import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BookService {
  model = 'books';

  constructor(private httpClient: HttpClient) {}

  // utils
  getUrl() {
    return `${environment.baseUrl}/${this.model}`;
  }

  getUrlWithId(id) {
    return `${environment.baseUrl}/${this.model}`;
  }

  getFilterQueryString(obj) {
    if (!obj) {
      return;
    }
    const filterMap = new Map(Object.entries(obj));
    let filterString = '';

    filterMap.forEach((value, key) => {
      if (value && value !== '') {
        filterString += `&${key}=${value}`;
      }
    });
    return filterString;
  }

  // service calls

  getAll(filters?, pagination?) {
    return this.httpClient.get(
      `${this.getUrl()}?${filters ? this.getFilterQueryString(filters) : ''}${
        pagination ? this.getFilterQueryString(pagination) : ''
      }`
    );
  }

  getById(id) {
    return this.httpClient.get(this.getUrlWithId(id));
  }

  getBookCount() {
    return this.httpClient.get(`${this.getUrl()}/count`);
  }
}
