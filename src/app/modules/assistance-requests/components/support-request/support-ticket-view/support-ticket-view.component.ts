import { updateButtonConfig } from './../../feature-request/feature-ticket-view/config';
import { SupportRequestService } from './../../../services/support-request/support-request.service';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { IconComponent } from '../../../../core/components/icon/icon.component';
import { backIconConfig, previewLinkConfig, progressBarConfig } from './config';
import { ActivatedRoute } from '@angular/router';
import { SupportTicketModel } from '../../../models/support-ticket.model';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { ChipComponent } from '../../../../core/components/chip/chip.component';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { ChipComponentModel } from '../../../../core/components/chip/chip.component.model';

@Component({
  selector: 'app-support-ticket-view',
  standalone: true,
  imports: [MatToolbar, MatCardModule, IconComponent, DatePipe, ButtonComponent, NgxSkeletonLoaderComponent, ChipComponent],
  templateUrl: './support-ticket-view.component.html',
  styleUrl: './support-ticket-view.component.scss',
})
export class SupportTicketViewComponent implements OnInit {
  backIconConfig = backIconConfig;
  progressBarConfig = progressBarConfig;
  updateButtonConfig = updateButtonConfig;
  previewLinkConfig = previewLinkConfig;

  ticketData!: SupportTicketModel;

  skeletonLoaderHeaderConfig = { width: '250px', height: '40px', 'border-radius': '10px', 'background-color': '#00000029' };
  skeletonLoaderConfig = { width: '250px', height: '20px', 'border-radius': '10px' }

  constructor(
    private route: ActivatedRoute,
    private supportRequestService: SupportRequestService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    const Subscription = this.supportRequestService.getTicket(id!).subscribe({
      next: response => this.ticketData = response.data
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  onPreview() {
    // TODO
  }

  onUpdate(): void {
    // TODO
  }

  prepareChipConfig(label: string): ChipComponentModel {
    return { label };
  }
}
