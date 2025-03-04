import { Observable } from 'rxjs';
import { RestApiService } from './../rest-api/rest-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchQuery = '';

  constructor (private restApiService: RestApiService) { }

  setSearchQuery(searchQuery: string): void {
    this.searchQuery = searchQuery;
  }

  getSearchQuery(): string {
    return this.searchQuery;
  }

  getSearchedResults(): Observable<any> {
    return this.restApiService.get('search', { query: this.searchQuery });
  }
}
