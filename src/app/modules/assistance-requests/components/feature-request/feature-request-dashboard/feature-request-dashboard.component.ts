import { MatToolbarModule } from '@angular/material/toolbar';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { awsChartConfig, azureChartConfig, createRequestButtonConfig, gcpChartConfig, othersChartConfig } from './config';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { NavigationService } from '../../../../core/services/navigation/navigation.service';
import { ButtonComponentModel } from '../../../../core/components/button/button.component.model';
import { PieChartComponent } from '../../../../core/components/pie-chart/pie-chart.component';
import { FeatureRequestService } from '../../../services/feature-request/feature-request.service';
import { CLOUD_COLOR_MAPPER, CloudProviders, FeatureTicketModel } from '../../../models/feature-ticket.model';
import { ChartUtils } from '../../../utils/chart.utils';
import { TableComponent } from '../../../../core/components/table/table.component';
import { PaginatorComponent } from '../../../../core/components/paginator/paginator.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-feature-request-dashboard',
  standalone: true,
  imports: [MatToolbarModule, ButtonComponent, PieChartComponent, TableComponent, PaginatorComponent],
  templateUrl: './feature-request-dashboard.component.html',
  styleUrl: './feature-request-dashboard.component.scss',
})
export class FeatureRequestDashboardComponent implements OnInit {
  createRequestButtonConfig = createRequestButtonConfig;
  awsChartConfig = awsChartConfig;
  azureChartConfig = azureChartConfig;
  gcpChartConfig = gcpChartConfig;
  othersChartConfig = othersChartConfig;

  tableData: FeatureTicketModel[] = [];
  columnsDef = ['title', 'description', 'cloudProvider', 'tags', 'createdAt', 'deadLine', 'priority'];

  pageIndex = 0;
  totalTickets = 0;
  isTableDataLoading = true;

  chartUtils = new ChartUtils();

  isChartDataLoading = true;

  constructor(
    private navigationService: NavigationService,
    private featureRequestService: FeatureRequestService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.featureRequestService.getTicketStatus();
    this.featureRequestService.getTickets({ page: this.pageIndex, limit: 5 });
    this.subscribeToFeatureTickets();
    this.subscribeToFeatureTicketStatus();
  }

  subscribeToFeatureTicketStatus() {
    const Subscription = this.featureRequestService.ticketStatusBehaviorSubject.subscribe((response: any) => {
      if (response) {
        this.updateChartConfig(response);
        this.isChartDataLoading = false;
      }
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  subscribeToFeatureTickets() {
    const Subscription = this.featureRequestService.ticketsBehaviorSubject.subscribe((data: any) => {
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
    const providers = [
      { key: 'aws', name: CloudProviders.AWS, config: 'awsChartConfig' },
      { key: 'azure', name: CloudProviders.AZURE, config: 'azureChartConfig' },
      { key: 'gcp', name: CloudProviders.GCP, config: 'gcpChartConfig' },
      {
        key: 'others',
        name: CloudProviders.OTHERS,
        config: 'othersChartConfig',
      },
    ];

    type ConfigKeys = 'awsChartConfig' | 'azureChartConfig' | 'gcpChartConfig' | 'othersChartConfig';

    providers.forEach(provider => {
      const tickets = ticketStatus[`${provider.key}Tickets`];
      const chartData = [
        { value: tickets, color: CLOUD_COLOR_MAPPER[provider.name].success },
        {
          value: ticketStatus.totalTickets - tickets,
          color: CLOUD_COLOR_MAPPER[provider.name].fails,
        },
      ];
      const centerText = { value: tickets ?? 0, label: 'Submissions' };
      this[provider.config as ConfigKeys] = this.chartUtils.updateChartConfig(chartData, centerText, this[provider.config as ConfigKeys]);
    });
  }

  onCreateRequest(data: ButtonComponentModel) {
    this.navigationService.navigate(data.routerLink);
  }

  onTableEvent(data: any) {
    const queryParams = { id: data._id };
    this.navigationService.navigate('/partner-portal/assistance-requests/feature-ticket-view', queryParams);
  }

  onPaginatorEvent(eve: PageEvent) {
    this.tableData = [];
    this.pageIndex = eve.pageIndex;
    this.isTableDataLoading = true;
    this.featureRequestService.getTickets({ page: this.pageIndex, limit: 5 });
  }
}
