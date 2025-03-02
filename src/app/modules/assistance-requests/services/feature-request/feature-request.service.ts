import { Injectable, DestroyRef } from '@angular/core';
import { FeatureTicketModel } from '../../models/feature-ticket.model';
import { RestApiService } from '../../../core/services/rest-api/rest-api.service';
import { BehaviorSubject } from 'rxjs';
import { ToasterService } from '../../../core/services/toaster/toaster.service';
import { NavigationService } from '../../../core/services/navigation/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureRequestService {
  endPoint = 'feature';
  ticketStatusBehaviorSubject = new BehaviorSubject<any>(null);
  ticketPriorityStatusBehaviorSubject = new BehaviorSubject<any>(null);
  ticketsBehaviorSubject = new BehaviorSubject<FeatureTicketModel[] | null>(null);
  isRequestingSending = new BehaviorSubject<boolean>(false);

  constructor(
    private restApiService: RestApiService,
    private toasterService: ToasterService,
    private navigationService: NavigationService,
    private destroyRef: DestroyRef
  ) {}

  getTicketStatus() {
    const Subscription = this.restApiService.get(this.endPoint + '/ticketStatus').subscribe({
      next: (response: any) => {
        this.ticketStatusBehaviorSubject.next(response.data);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  getTicketPriorityStatus() {
    const Subscription = this.restApiService.get(this.endPoint + '/priorityStatus').subscribe({
      next: (response: any) => {
        this.ticketPriorityStatusBehaviorSubject.next(response.data);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  getTickets(params: any) {
    const Subscription = this.restApiService.get(this.endPoint + '/tickets', params).subscribe({
      next: (response: any) => {
        this.ticketsBehaviorSubject.next(response.data as FeatureTicketModel[]);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  getTicket(id: string) {
    return this.restApiService.get(`${this.endPoint}/${id}`);
  }

  createTicket(data: FeatureTicketModel) {
    this.isRequestingSending.next(true);
    const Subscription = this.restApiService.post(this.endPoint, data).subscribe({
      next: (response: any) => {
        this.toasterService.showSuccess(response.message);
        this.isRequestingSending.next(false);
      },
      error: (error: any) => {
        this.toasterService.showError(error.message);
        this.isRequestingSending.next(false);
      },
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  updateTicket(id: string, data: FeatureTicketModel) {
    this.isRequestingSending.next(true);
    const Subscription = this.restApiService.put(`${this.endPoint}/${id}`, data).subscribe({
      next: (response: any) => {
        this.toasterService.showSuccess(response.message);
        this.isRequestingSending.next(false);
        const queryParams = { id };
        this.navigationService.navigate('/partner-portal/assistance-requests/feature-ticket-view', queryParams);
      },
      error: (error: any) => {
        this.toasterService.showError(error.message);
        this.isRequestingSending.next(false);
      },
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  deleteTicket(id: string): void {
    this.isRequestingSending.next(true);
    const Subscription = this.restApiService.delete(`${this.endPoint}/${id}`).subscribe({
      next: (response: any) => {
        this.isRequestingSending.next(false);
        this.toasterService.showSuccess(response.message);
        this.navigationService.navigate('/partner-portal/assistance-requests/feature-request-dashboard');
      },
      error: (error: any) => {
        this.toasterService.showError(error.message);
        this.isRequestingSending.next(false);
      },
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }
}
