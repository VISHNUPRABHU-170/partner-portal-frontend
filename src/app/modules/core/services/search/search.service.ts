import { RestApiService } from './../rest-api/rest-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor (private restApiService: RestApiService) { }

  getSearchedResults(query: string) {
    return this.restApiService.get('search', { query });
  }
}
