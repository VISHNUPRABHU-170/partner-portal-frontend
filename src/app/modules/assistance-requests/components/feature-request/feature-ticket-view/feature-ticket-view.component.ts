import { ChipListComponent } from './../../../../core/components/chip-list/chip-list.component';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { backIconConfig, progressBarConfig, updateButtonConfig } from './config';
import { IconComponent } from '../../../../core/components/icon/icon.component';
import { FeatureRequestService } from '../../../services/feature-request/feature-request.service';
import { MatCardModule } from '@angular/material/card';
import { FeatureTicketModel } from '../../../models/feature-ticket.model';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { ChipComponent } from '../../../../core/components/chip/chip.component';
import { ChipComponentModel } from '../../../../core/components/chip/chip.component.model';
import { NavigationService } from '../../../../core/services/navigation/navigation.service';

@Component({
  selector: 'app-feature-ticket-view',
  standalone: true,
  imports: [MatToolbar, MatCardModule, IconComponent, DatePipe, ButtonComponent, NgxSkeletonLoaderComponent, ChipComponent, ChipListComponent],
  templateUrl: './feature-ticket-view.component.html',
  styleUrl: './feature-ticket-view.component.scss',
})
export class FeatureTicketViewComponent implements OnInit {
  backIconConfig = backIconConfig;
  progressBarConfig = progressBarConfig;
  updateButtonConfig = updateButtonConfig;

  ticketID!: string;
  ticketData!: FeatureTicketModel;

  skeletonLoaderHeaderConfig = { width: '250px', height: '40px', 'border-radius': '10px', 'background-color': '#00000029' }
  skeletonLoaderConfig = { width: '250px', height: '20px', 'border-radius': '10px' }

  constructor(
    private route: ActivatedRoute,
    private featureRequestService: FeatureRequestService,
    private destroyRef: DestroyRef,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.ticketID = this.route.snapshot.queryParamMap.get('id')!;
    const Subscription = this.featureRequestService.getTicket(this.ticketID).subscribe({
      next: response => this.ticketData = response.data
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  onUpdate(): void {
    const queryParams = { id: this.ticketID };
    this.navigationService.navigate('/partner-portal/assistance-requests/feature-request-form', queryParams);
  }

  prepareChipConfig(label: string): ChipComponentModel {
    return { label };
  }

  prepareChipListConfig(label: string[]): ChipComponentModel[] {
    return [...label.map(this.prepareChipConfig)];
  }
}
