import { Component, Input, OnChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PieChartComponentModel } from './pie-chart.component.model';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartBuilderService } from '../../services/chart-builder/chart-builder.service';
import Highcharts from 'highcharts';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [MatCardModule, HighchartsChartModule, NgxSkeletonLoaderModule],
  providers: [ChartBuilderService],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnChanges {
  // Input property to accept chart configuration from the parent component
  @Input() chartConfig!: PieChartComponentModel;

  // Reference to the Highcharts library for chart rendering
  Highcharts = Highcharts;

  // Holds the chart configuration options generated for Highcharts
  chartData!: Highcharts.Options;

  constructor(private chartBuilderService: ChartBuilderService) {}

  /**
   * Lifecycle hook to update the chart configuration based on the new input.
   */
  ngOnChanges(): void {
    this.chartData = {
      ...this.chartBuilderService.preparePieChartConfig(this.chartConfig),
    } as Highcharts.Options;
  }
}
