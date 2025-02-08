import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { environments } from '../../../../environments/environment';

/**
 * Interceptor to attach an Authorization header to HTTP requests.
 *
 * This interceptor:
 * - Retrieves a token from `StorageService`.
 * - Clones the original request and adds headers for authorization and content type.
 * - Passes the modified request to the next handler in the chain.
 */
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const storageService = inject(StorageService);
  const token = storageService.getSessionItem('authToken');
  const accessToken = environments.ACCESS_TOKEN;
  let modifiedReq: HttpRequest<any>;
  if (token) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
  } else {
    modifiedReq = req.clone({
      setHeaders: {
        access_token: `${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }
  return next(modifiedReq);
};
