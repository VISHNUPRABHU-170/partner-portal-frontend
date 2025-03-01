import { Component, Input, OnChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { BarChartComponentModel } from './bar-chart.component.model';
import { ChartBuilderService } from '../../services/chart-builder/chart-builder.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [HighchartsChartModule, MatCardModule, NgxSkeletonLoaderModule],
  providers: [ChartBuilderService],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent implements OnChanges {
  // Input property to accept chart configuration from the parent component
  @Input() chartConfig!: BarChartComponentModel;

  @Input() isLoading!: boolean;

  // Reference to the Highcharts library for chart rendering
  Highcharts = Highcharts;

  // Holds the chart configuration options generated for Highcharts
  chartData!: Highcharts.Options;

  skeletonLoaderConfig = { width: '320px', height: '320px', 'border-radius': '10px' };

  constructor(private chartBuilderService: ChartBuilderService) {}

  /**
   * Lifecycle hook to update the chart configuration based on the new input.
   */
  ngOnChanges(): void {
    this.chartData = {
      ...this.chartBuilderService.prepareBarChartConfig(this.chartConfig),
    } as Highcharts.Options;
  }
}
