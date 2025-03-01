import { DestroyRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupportTicketModel } from '../../models/support-ticket.model';
import { RestApiService } from '../../../core/services/rest-api/rest-api.service';
import { ToasterService } from '../../../core/services/toaster/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class SupportRequestService {
  endPoint = 'support';
  ticketStatusBehaviorSubject = new BehaviorSubject<any>(null);
  ticketPriorityStatusBehaviorSubject = new BehaviorSubject<any>(null);
  ticketsBehaviorSubject = new BehaviorSubject<SupportTicketModel[] | null>(null);

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
        this.ticketsBehaviorSubject.next(response.data as SupportTicketModel[]);
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

  createTicket(data: SupportTicketModel) {
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
