import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PageEvent } from '@angular/material/paginator';
import { SupportRequestService } from './../../../services/support-request/support-request.service';
import {
  createRequestButtonConfig,
  resolvedTicketChartConfig,
  totalTicketChartConfig,
  inProgressTicketChartConfig,
  toDoTicketChartConfig,
} from './config';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { NavigationService } from '../../../../core/services/navigation/navigation.service';
import { ButtonComponentModel } from '../../../../core/components/button/button.component.model';
import { PieChartComponent } from '../../../../core/components/pie-chart/pie-chart.component';
import { PaginatorComponent } from '../../../../core/components/paginator/paginator.component';
import { TableComponent } from '../../../../core/components/table/table.component';
import { SupportTicketModel, TICKET_STATUS_COLOR_MAPPER, TicketStatus } from '../../../models/support-ticket.model';
import { ChartUtils } from '../../../utils/chart.utils';

@Component({
  selector: 'app-support-dashboard',
  standalone: true,
  imports: [MatToolbarModule, ButtonComponent, PieChartComponent, PaginatorComponent, TableComponent],
  templateUrl: './support-dashboard.component.html',
  styleUrl: './support-dashboard.component.scss',
})
export class SupportDashboardComponent implements OnInit {
  createRequestButtonConfig = createRequestButtonConfig;
  toDoTicketChartConfig = toDoTicketChartConfig;
  inProgressTicketChartConfig = inProgressTicketChartConfig;
  resolvedTicketChartConfig = resolvedTicketChartConfig;
  totalTicketChartConfig = totalTicketChartConfig;

  tableData: SupportTicketModel[] = [];
  columnsDef = ['title', 'description', 'createdAt', 'deadLine', 'priority', 'status'];

  pageIndex = 0;
  totalTickets = 0;
  isTableDataLoading = true;

  chartUtils = new ChartUtils();

  isChartDataLoading = true;

  constructor(
    private navigationService: NavigationService,
    private supportRequestService: SupportRequestService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.supportRequestService.getTicketStatus();
    this.supportRequestService.getTickets({ page: this.pageIndex, limit: 5 });
    this.subscribeToSupportTickets();
    this.subscribeToSupportTicketStatus();
  }

  subscribeToSupportTicketStatus() {
    const Subscription = this.supportRequestService.ticketStatusBehaviorSubject.subscribe((response: any) => {
      if (response) {
        this.isChartDataLoading = false;
        this.updateChartConfig(response);
      }
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  subscribeToSupportTickets() {
    const Subscription = this.supportRequestService.ticketsBehaviorSubject.subscribe((data: any) => {
      if (data) {
        this.isTableDataLoading = false;
        this.tableData = data?.tickets;
        this.totalTickets = data?.totalTickets;
      }
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  updateChartConfig(ticketStatus: any) {
    const ticketStatuses = [
      { status: TicketStatus.TODO, config: 'toDoTicketChartConfig' },
      {
        status: TicketStatus.INPROGRESS,
        config: 'inProgressTicketChartConfig',
      },
      { status: TicketStatus.COMPLETED, config: 'resolvedTicketChartConfig' },
      { status: TicketStatus.TICKETS, config: 'totalTicketChartConfig' },
    ];

    type ConfigKeys = 'toDoTicketChartConfig' | 'inProgressTicketChartConfig' | 'resolvedTicketChartConfig' | 'totalTicketChartConfig';

    ticketStatuses.forEach(({ status, config }) => {
      const chartData = [
        {
          value: ticketStatus[status],
          color: TICKET_STATUS_COLOR_MAPPER[status],
        },
      ];
      const centerTextData = {
        value: ticketStatus[status] ?? 0,
        label: 'Tickets',
      };
      this[config as ConfigKeys] = this.chartUtils.updateChartConfig(chartData, centerTextData, this[config as ConfigKeys]);
    });
  }

  onCreateRequest(data: ButtonComponentModel) {
    this.navigationService.navigate(data.routerLink);
  }

  onTableEvent(data: any) {
    const queryParams = { id: data._id };
    this.navigationService.navigate('/partner-portal/assistance-requests/support-ticket-view', queryParams);
  }

  onPaginatorEvent(eve: PageEvent) {
    this.tableData = [];
    this.pageIndex = eve.pageIndex;
    this.isTableDataLoading = true;
    this.supportRequestService.getTickets({ page: this.pageIndex, limit: 5 });
  }
}
