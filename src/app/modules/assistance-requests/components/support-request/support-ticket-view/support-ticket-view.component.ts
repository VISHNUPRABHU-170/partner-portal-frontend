import { updateButtonConfig } from './../../feature-request/feature-ticket-view/config';
import { SupportRequestService } from './../../../services/support-request/support-request.service';
import { Component, DestroyRef, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { IconComponent } from '../../../../core/components/icon/icon.component';
import { backIconConfig, previewLinkConfig, progressBarConfig } from './config';
import { ActivatedRoute } from '@angular/router';
import { SupportTicketModel } from '../../../models/support-ticket.model';
import { DatePipe } from '@angular/common';
import { ChipComponent } from '../../../../core/components/chip/chip.component';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { ChipComponentModel } from '../../../../core/components/chip/chip.component.model';
import { NavigationService } from '../../../../core/services/navigation/navigation.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-support-ticket-view',
  standalone: true,
  imports: [MatToolbar, MatCardModule, IconComponent, DatePipe, NgxSkeletonLoaderComponent, ChipComponent, MatMenuModule, MatProgressBarModule],
  templateUrl: './support-ticket-view.component.html',
  styleUrl: './support-ticket-view.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SupportTicketViewComponent implements OnInit {
  backIconConfig = backIconConfig;
  progressBarConfig = progressBarConfig;
  updateButtonConfig = updateButtonConfig;
  previewLinkConfig = previewLinkConfig;

  ticketID!: string;
  ticketData!: SupportTicketModel | undefined;

  isRequestingSending = false;

  skeletonLoaderHeaderConfig = { width: '250px', height: '40px', 'border-radius': '10px', 'background-color': '#00000029' };
  skeletonLoaderConfig = { width: '250px', height: '20px', 'border-radius': '10px' };

  constructor (
    private route: ActivatedRoute,
    private supportRequestService: SupportRequestService,
    private destroyRef: DestroyRef,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.subscribeToQueryParams();
    this.subscribeToIsRequestingSending();
  }

  subscribeToQueryParams() {
    const Subscription = this.route.queryParams.subscribe((params) => {
      this.ticketData = undefined;
      this.ticketID = params['id'];
      this.supportRequestService.getTicket(this.ticketID).pipe(take(1)).subscribe((response) => this.ticketData = response.data);
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

  onPreview() {
    // TODO
  }

  onUpdate(): void {
    const queryParams = { id: this.ticketID };
    this.navigationService.navigate('/partner-portal/assistance-requests/support-form', queryParams);
  }

  onDelete(): void {
    this.supportRequestService.deleteTicket(this.ticketID);
  }

  prepareChipConfig(label: string): ChipComponentModel {
    return { label };
  }
}
