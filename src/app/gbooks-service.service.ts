import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GbooksServiceService {
  getBooks: any;
  gbooksUrl = 'https://www.googleapis.com/books/v1/volumes?q=programming&startIndex=0&maxResults=15';
  editBook: boolean;
  constructor(private _http: HttpClient) { }

  getGoogleBooks() {
    this.getBooks = this._http.get(this.gbooksUrl);
    console.log(this.getBooks);
    return this.getBooks;
  }
}
