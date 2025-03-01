import { PieChartComponent } from './../../../core/components/pie-chart/pie-chart.component';
import { Component, OnInit } from '@angular/core';
import { pieChartConfig, barChartConfig } from './config';
import { MatCardModule } from '@angular/material/card';
import { BarChartComponent } from '../../../core/components/bar-chart/bar-chart.component';
import { ChartUtils } from '../../../assistance-requests/utils/chart.utils';
import { FeatureRequestService } from '../../../assistance-requests/services/feature-request/feature-request.service';
import { CLOUD_COLOR_MAPPER, CloudProviders } from '../../../assistance-requests/models/feature-ticket.model';

@Component({
  selector: 'app-feature-ticket-charts',
  standalone: true,
  imports: [MatCardModule, PieChartComponent, BarChartComponent],
  templateUrl: './feature-ticket-charts.component.html',
  styleUrl: './feature-ticket-charts.component.scss',
})
export class FeatureTicketChartsComponent implements OnInit {
  pieChartConfig = pieChartConfig;
  barChartConfig = barChartConfig;

  chartUtils = new ChartUtils();

  isLoading = true;

  constructor(private featureRequestService: FeatureRequestService) {}

  ngOnInit(): void {
    this.featureRequestService.getTicketStatus();
    this.subscribeToFeatureTicketStatus();
  }

  subscribeToFeatureTicketStatus() {
    this.featureRequestService.ticketStatusBehaviorSubject.subscribe((ticketStatus: any) => {

      if (!ticketStatus) return;

      const chartData = [
        {
          name: 'AWS',
          value: ticketStatus.awsTickets,
          color: CLOUD_COLOR_MAPPER[CloudProviders.AWS].fails,
        },
        {
          name: 'AZURE',
          value: ticketStatus.azureTickets,
          color: CLOUD_COLOR_MAPPER[CloudProviders.AZURE].fails,
        },
        {
          name: 'GCP',
          value: ticketStatus.gcpTickets,
          color: CLOUD_COLOR_MAPPER[CloudProviders.GCP].fails,
        },
        {
          name: 'OTHERS',
          value: ticketStatus.othersTickets,
          color: CLOUD_COLOR_MAPPER[CloudProviders.OTHERS].fails,
        },
      ];
      this.pieChartConfig = this.chartUtils.updateChartConfig(chartData, null, this.pieChartConfig);
      this.barChartConfig.data = [ticketStatus.awsTickets, ticketStatus.azureTickets, ticketStatus.gcpTickets, ticketStatus.othersTickets];
      this.barChartConfig.colors = [
        CLOUD_COLOR_MAPPER[CloudProviders.AWS].fails,
        CLOUD_COLOR_MAPPER[CloudProviders.AZURE].fails,
        CLOUD_COLOR_MAPPER[CloudProviders.GCP].fails,
        CLOUD_COLOR_MAPPER[CloudProviders.OTHERS].fails,
      ];
      this.barChartConfig = structuredClone(this.barChartConfig);
      this.isLoading = false;
    });
  }
}
