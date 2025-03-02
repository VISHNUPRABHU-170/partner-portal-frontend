import { SupportRequestService } from './../../../services/support-request/support-request.service';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { backIconConfig, stepperConfig } from './config';
import { IconComponent } from '../../../../core/components/icon/icon.component';
import { MatCardModule } from '@angular/material/card';
import { StepperComponent } from '../../../../core/components/stepper/stepper.component';
import { SupportTicketModel } from '../../../models/support-ticket.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-support-form',
  standalone: true,
  imports: [MatToolbarModule, IconComponent, MatCardModule, StepperComponent, MatProgressBarModule],
  templateUrl: './support-form.component.html',
  styleUrl: './support-form.component.scss',
})
export class SupportFormComponent implements OnInit {
  backIconConfig = backIconConfig;
  stepperConfig = stepperConfig;

  ticketID!: string;
  ticketData!: SupportTicketModel;
  isRequestingSending = false;

  constructor(
    private route: ActivatedRoute,
    private supportRequestService: SupportRequestService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.subscribeToIsRequestingSending();
    this.ticketID = this.route.snapshot.queryParamMap.get('id')!;
    if(this.ticketID) this.getTicketData();
  }

  getTicketData(): void {
    this.isRequestingSending = true;
    backIconConfig.routerLink = `/partner-portal/assistance-requests/support-ticket-view`;
    backIconConfig.queryParams = { id: this.ticketID };
    const Subscription = this.supportRequestService.getTicket(this.ticketID).subscribe(response => {
      this.ticketData = response.data;
      this.isRequestingSending = false
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  subscribeToIsRequestingSending(): void {
    this.supportRequestService.isRequestingSending.subscribe((isRequestingSending) => {
      this.isRequestingSending = isRequestingSending;
    });
  }

  onSubmit(data: SupportTicketModel) {
    if(this.ticketID) this.supportRequestService.updateTicket(this.ticketID, data);
    else this.supportRequestService.createTicket(data);
  }
}
