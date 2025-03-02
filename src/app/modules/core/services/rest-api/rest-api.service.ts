import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * A service for making HTTP requests to a backend API.
 * Provides methods for GET and POST operations.
 */
@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  //The base URL for the backend API. This must be set before making any API calls.
  backendBaseURL!: string;

  constructor(private httpClient: HttpClient) {}

  /**
   * Makes a GET request to the specified endpoint with optional query parameters.
   * @param endPoint - The API endpoint to call.
   * @param params - Optional query parameters as a key-value object.
   * @returns An Observable that emits the API response.
   */
  get(endPoint: string, params?: any): Observable<any> {
    return this.httpClient.get(`${this.backendBaseURL}/${endPoint}`, {
      params,
    });
  }

  /**
   * Makes a POST request to the specified endpoint with the provided payload.
   * @param endPoint - The API endpoint to call.
   * @param data - The payload to send in the request body.
   * @returns An Observable that emits the API response.
   */
  post(endPoint: string, data: any): Observable<any> {
    return this.httpClient.post(`${this.backendBaseURL}/${endPoint}`, data);
  }

  /**
 * Makes a PUT request to the specified endpoint with the provided payload.
 * @param endPoint - The API endpoint to call.
 * @param data - The payload to send in the request body.
 * @returns An Observable that emits the API response.
 */
  put(endPoint: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.backendBaseURL}/${endPoint}`, data);
  }
}
