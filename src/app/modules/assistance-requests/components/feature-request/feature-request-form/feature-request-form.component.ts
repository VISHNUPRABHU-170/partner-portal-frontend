import { backIconConfig, stepperConfig } from './config';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IconComponent } from '../../../../core/components/icon/icon.component';
import { MatCardModule } from '@angular/material/card';
import { StepperComponent } from '../../../../core/components/stepper/stepper.component';
import { FeatureTicketModel } from '../../../models/feature-ticket.model';
import { FeatureRequestService } from '../../../services/feature-request/feature-request.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feature-request-form',
  standalone: true,
  imports: [MatToolbarModule, IconComponent, MatCardModule, StepperComponent, MatProgressBarModule],
  templateUrl: './feature-request-form.component.html',
  styleUrl: './feature-request-form.component.scss',
})
export class FeatureRequestFormComponent implements OnInit {
  backIconConfig = backIconConfig;
  stepperConfig = stepperConfig;

  ticketID!: string;
  ticketData!: FeatureTicketModel;
  isRequestingSending = false;

  constructor (
    private route: ActivatedRoute,
    private featureTicketService: FeatureRequestService,
    private destroyRef: DestroyRef,
  ) { }

  ngOnInit(): void {
    this.subscribeToIsRequestingSending();
    this.ticketID = this.route.snapshot.queryParamMap.get('id')!;
    if (this.ticketID) this.getTicketData();
  }

  getTicketData(): void {
    this.isRequestingSending = true;
    this.backIconConfig = { ...this.backIconConfig, routerLink: `/partner-portal/assistance-requests/feature-ticket-view`, queryParams: { id: this.ticketID } };
    const Subscription = this.featureTicketService.getTicket(this.ticketID).subscribe(response => {
      this.ticketData = response.data;
      this.isRequestingSending = false;
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  subscribeToIsRequestingSending(): void {
    this.featureTicketService.isRequestingSending.subscribe((isRequestingSending) => {
      this.isRequestingSending = isRequestingSending;
    });
  }

  onSubmit(data: FeatureTicketModel) {
    if (this.ticketID) this.featureTicketService.updateTicket(this.ticketID, data);
    else this.featureTicketService.createTicket(data);  }
}
