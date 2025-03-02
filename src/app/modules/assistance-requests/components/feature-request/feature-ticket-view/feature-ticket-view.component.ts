import { ChipListComponent } from './../../../../core/components/chip-list/chip-list.component';
import { Component, DestroyRef, OnInit, ViewEncapsulation } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { backIconConfig, progressBarConfig, updateButtonConfig } from './config';
import { IconComponent } from '../../../../core/components/icon/icon.component';
import { FeatureRequestService } from '../../../services/feature-request/feature-request.service';
import { MatCardModule } from '@angular/material/card';
import { FeatureTicketModel } from '../../../models/feature-ticket.model';
import { DatePipe } from '@angular/common';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { ChipComponent } from '../../../../core/components/chip/chip.component';
import { ChipComponentModel } from '../../../../core/components/chip/chip.component.model';
import { NavigationService } from '../../../../core/services/navigation/navigation.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-feature-ticket-view',
  standalone: true,
  imports: [MatToolbar, MatCardModule, IconComponent, DatePipe, NgxSkeletonLoaderComponent, ChipComponent, ChipListComponent, MatMenuModule, MatProgressBarModule],
  templateUrl: './feature-ticket-view.component.html',
  styleUrl: './feature-ticket-view.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FeatureTicketViewComponent implements OnInit {
  backIconConfig = backIconConfig;
  progressBarConfig = progressBarConfig;
  updateButtonConfig = updateButtonConfig;

  ticketID!: string;
  ticketData!: FeatureTicketModel;

  isRequestingSending = false;

  skeletonLoaderHeaderConfig = { width: '250px', height: '40px', 'border-radius': '10px', 'background-color': '#00000029' }
  skeletonLoaderConfig = { width: '250px', height: '20px', 'border-radius': '10px' }

  constructor(
    private route: ActivatedRoute,
    private featureRequestService: FeatureRequestService,
    private destroyRef: DestroyRef,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.subscribeToIsRequestingSending();
    this.ticketID = this.route.snapshot.queryParamMap.get('id')!;
    const Subscription = this.featureRequestService.getTicket(this.ticketID).subscribe({
      next: response => this.ticketData = response.data
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  subscribeToIsRequestingSending(): void {
    this.featureRequestService.isRequestingSending.subscribe((isRequestingSending) => {
      this.isRequestingSending = isRequestingSending;
    });
  }

  onUpdate(): void {
    const queryParams = { id: this.ticketID };
    this.navigationService.navigate('/partner-portal/assistance-requests/feature-request-form', queryParams);
  }

  onDelete(): void {
    this.featureRequestService.deleteTicket(this.ticketID);
  }

  prepareChipConfig(label: string): ChipComponentModel {
    return { label };
  }

  prepareChipListConfig(label: string[]): ChipComponentModel[] {
    return [...label.map(this.prepareChipConfig)];
  }
}
