import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BookService {

  model = 'books'

  constructor(private httpClient:HttpClient) { }

  // utils
  getUrl(){
    return `${environment.baseUrl}/${this.model}`
  }

  getUrlWithId(id){
    return `${environment.baseUrl}/${this.model}`
  }

  // service calls

  getAll(){
    return this.httpClient.get(this.getUrl())
  }

  getById(id){
    return this.httpClient.get(this.getUrlWithId(id))
  }
}
