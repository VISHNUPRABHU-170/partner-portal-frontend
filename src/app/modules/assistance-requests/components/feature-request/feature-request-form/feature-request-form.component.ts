import { backIconConfig, stepperConfig } from './config';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IconComponent } from '../../../../core/components/icon/icon.component';
import { MatCardModule } from '@angular/material/card';
import { StepperComponent } from '../../../../core/components/stepper/stepper.component';
import { FeatureTicketModel } from '../../../models/feature-ticket.model';
import { FeatureRequestService } from '../../../services/feature-request/feature-request.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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

  isRequestingSending = false;

  constructor (private featureTicketService: FeatureRequestService) { }

  ngOnInit(): void {
    this.subscribeToIsRequestingSending();
  }

  subscribeToIsRequestingSending(): void {
    this.featureTicketService.isRequestingSending.subscribe((isRequestingSending) => {
      this.isRequestingSending = isRequestingSending;
    });
  }

  onSubmit(data: FeatureTicketModel) {
    this.featureTicketService.createTicket(data);
  }
}
