import { DestroyRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationService } from './../../core/services/navigation/navigation.service';
import { StorageService } from '../../core/services/storage/storage.service';
import { RestApiService } from './../../core/services/rest-api/rest-api.service';
import { ToasterService } from '../../core/services/toaster/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginDataModel } from '../models/login.model';
import { RegisterDataModel } from '../models/register.model';
import { HttpResponse } from '../../core/models/http-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authLoginURL!: string;
  authRegisterURL!: string;
  spinnerBehaviorSubject = new BehaviorSubject(false);

  constructor(
    private restApiService: RestApiService,
    private storageService: StorageService,
    private navigationService: NavigationService,
    private toasterService: ToasterService,
    private destroyRef: DestroyRef
  ) {}

  /**
   * Method to handle user registration
   * @param data - Registration data (email, password, etc.)
   */
  onRegister(data: RegisterDataModel): void {
    const Subscription = this.restApiService.post(this.authRegisterURL, data).subscribe({
      next: (response: HttpResponse<null>) => {
        this.spinnerBehaviorSubject.next(false);
        if (response.success == true) {
          this.navigationService.navigate('login');
        }
        this.toasterService.showSuccess(response.message);
      },
      error: (response: HttpErrorResponse) => {
        // Handle error response
        this.spinnerBehaviorSubject.next(false);
        this.toasterService.showError(response.error.message);
      },
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  /**
   * Method to handle user login
   * @param data - Login data (email and password)
   */
  onLogin(data: LoginDataModel): void {
    const Subscription = this.restApiService.post(this.authLoginURL, data).subscribe({
      next: (response: HttpResponse<null>) => {
        this.spinnerBehaviorSubject.next(false);
        if (response.success === true) {
          this.storageService.setSessionItem('authToken', response.token);
          this.navigationService.navigate('partner-portal');
        }
        this.toasterService.showSuccess(response.message);
      },
      error: (response: HttpErrorResponse) => {
        // Handle error response
        this.spinnerBehaviorSubject.next(false);
        this.toasterService.showError(response.error.message);
      },
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  /**
   * Logs the user out by removing the authentication token from the session storage
   * and navigating to the login page.
   */
  onLogOut(): void {
    this.storageService.removeSessionItem('authToken');
    this.navigationService.navigate('login');
  }
}
