import { Injectable, DestroyRef } from '@angular/core';
import { FeatureTicketModel } from '../../models/feature-ticket.model';
import { RestApiService } from '../../../core/services/rest-api/rest-api.service';
import { BehaviorSubject } from 'rxjs';
import { ToasterService } from '../../../core/services/toaster/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureRequestService {
  endPoint = 'feature';
  ticketStatusBehaviorSubject = new BehaviorSubject<any>(null);
  ticketPriorityStatusBehaviorSubject = new BehaviorSubject<any>(null);
  ticketsBehaviorSubject = new BehaviorSubject<FeatureTicketModel[] | null>(null);

  constructor(
    private restApiService: RestApiService,
    private toasterService: ToasterService,
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
    const Subscription = this.restApiService.post(this.endPoint, data).subscribe({
      next: (response: any) => {
        this.toasterService.showSuccess(response.message);
      },
      error: (error: any) => {
        this.toasterService.showError(error.message);
      },
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }
}
