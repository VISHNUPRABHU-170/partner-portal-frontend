import { Component, OnInit } from '@angular/core';
import { barChartConfig, pieChartConfig } from './config';
import { MatCardModule } from '@angular/material/card';
import { PieChartComponent } from '../../../core/components/pie-chart/pie-chart.component';
import { BarChartComponent } from '../../../core/components/bar-chart/bar-chart.component';
import { SupportRequestService } from '../../../assistance-requests/services/support-request/support-request.service';
import { TICKET_STATUS_COLOR_MAPPER, TicketStatus } from '../../../assistance-requests/models/support-ticket.model';
import { ChartUtils } from '../../../assistance-requests/utils/chart.utils';

@Component({
  selector: 'app-support-ticket-charts',
  standalone: true,
  imports: [MatCardModule, PieChartComponent, BarChartComponent],
  templateUrl: './support-ticket-charts.component.html',
  styleUrl: './support-ticket-charts.component.scss',
})
export class SupportTicketChartsComponent implements OnInit {
  pieChartConfig = pieChartConfig;
  barChartConfig = barChartConfig;

  chartUtils = new ChartUtils();

  isLoading = true;

  constructor(private supportRequestService: SupportRequestService) {}

  ngOnInit(): void {
    this.supportRequestService.getTicketStatus();
    this.subscribeToSupportTicketStatus();
  }

  subscribeToSupportTicketStatus() {
    this.supportRequestService.ticketStatusBehaviorSubject.subscribe((ticketStatus: any) => {

      if (!ticketStatus) return;

      const chartData = [
        {
          name: 'TODO',
          value: ticketStatus[TicketStatus.TODO],
          color: TICKET_STATUS_COLOR_MAPPER[TicketStatus.TODO],
        },
        {
          name: 'INPROGRESS',
          value: ticketStatus[TicketStatus.INPROGRESS],
          color: TICKET_STATUS_COLOR_MAPPER[TicketStatus.INPROGRESS],
        },
        {
          name: 'COMPLETED',
          value: ticketStatus[TicketStatus.COMPLETED],
          color: TICKET_STATUS_COLOR_MAPPER[TicketStatus.COMPLETED],
        },
      ];
      this.pieChartConfig = this.chartUtils.updateChartConfig(chartData, null, this.pieChartConfig);
      this.barChartConfig.data = [ticketStatus[TicketStatus.TODO], ticketStatus[TicketStatus.INPROGRESS], ticketStatus[TicketStatus.COMPLETED]];
      this.barChartConfig.colors = [
        TICKET_STATUS_COLOR_MAPPER[TicketStatus.TODO],
        TICKET_STATUS_COLOR_MAPPER[TicketStatus.INPROGRESS],
        TICKET_STATUS_COLOR_MAPPER[TicketStatus.COMPLETED],
      ];
      this.barChartConfig = structuredClone(this.barChartConfig);
      this.isLoading = false;
    });
  }
}
