import { Component, OnInit } from '@angular/core';
import { highPriorityChartConfig, lowPriorityChartConfig, mediumPriorityChartConfig } from './config';
import { PieChartComponent } from '../../../core/components/pie-chart/pie-chart.component';
import { ChartUtils } from '../../../assistance-requests/utils/chart.utils';
import { FeatureRequestService } from '../../../assistance-requests/services/feature-request/feature-request.service';

@Component({
  selector: 'app-feature-ticket-tab',
  standalone: true,
  imports: [PieChartComponent],
  templateUrl: './feature-ticket-tab.component.html',
  styleUrl: './feature-ticket-tab.component.scss',
})
export class FeatureTicketTabComponent implements OnInit {
  highPriorityChartConfig = highPriorityChartConfig;
  mediumPriorityChartConfig = mediumPriorityChartConfig;
  lowPriorityChartConfig = lowPriorityChartConfig;

  chartUtils = new ChartUtils();

  isLoading = true;

  constructor(private featureRequestService: FeatureRequestService) {}

  ngOnInit(): void {
    this.featureRequestService.getTicketPriorityStatus();
    this.subscribeToTicketStatus();
  }

  subscribeToTicketStatus() {
    this.featureRequestService.ticketPriorityStatusBehaviorSubject.subscribe((ticketStatus: any) => {
      if (ticketStatus) this.updateChartConfig(ticketStatus);
    });
  }

  updateChartConfig(ticketStatus: any) {
    const ticketStatuses = [
      {
        config: 'highPriorityChartConfig',
        label: 'High',
        value: ticketStatus.high ?? 0,
        color: '#EB6253',
      },
      {
        config: 'mediumPriorityChartConfig',
        label: 'Medium',
        value: ticketStatus.medium ?? 0,
        color: '#FAD27D',
      },
      {
        config: 'lowPriorityChartConfig',
        label: 'Low',
        value: ticketStatus.low ?? 0,
        color: '#5FD198',
      },
    ];

    type ConfigKeys = 'highPriorityChartConfig' | 'mediumPriorityChartConfig' | 'lowPriorityChartConfig';

    ticketStatuses.forEach(({ config, label, value, color }) => {
      const chartData = [{ value: value, color: color }];
      const centerTextData = { value: value, label: label };
      this[config as ConfigKeys] = this.chartUtils.updateChartConfig(chartData, centerTextData, this[config as ConfigKeys]);
    });
    this.isLoading = false;
  }
}
