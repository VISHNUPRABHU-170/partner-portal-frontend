import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SearchService } from '../../services/search/search.service';
import { NavigationService } from '../../services/navigation/navigation.service';

interface SearchResultModel {
  featureTickets: any[];
  supportTickets: any[];
}

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [IconComponent, ReactiveFormsModule, MatProgressBarModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  searchControl = new FormControl('');

  showCloseIcon = false;

  searchResult!: SearchResultModel;

  isSearching = false;

  constructor (
    private searchService: SearchService,
    private navigationService: NavigationService,
  ) { }

  ngOnInit(): void {
    this.subscribeToSearchControl();
  }

  subscribeToSearchControl(): void {
    this.searchControl.valueChanges.subscribe((value) => {
      this.handleSearchQuery(value!);
      if (value && value !== '') this.showCloseIcon = true;
      else this.showCloseIcon = false;
    });
  }

  handleSearchQuery(value: string): void {
    this.isSearching = true;
    this.searchService.getSearchedResults(value).subscribe((response: any) => {
      this.isSearching = false;
      this.searchResult = response.data;
    });
  }

  onFeatureTicket(id: string): void {
    const queryParams = { id };
    this.navigationService.navigate('/partner-portal/assistance-requests/feature-ticket-view', queryParams);
  }

  onSupportTicket(id: string): void {
    const queryParams = { id };
    this.navigationService.navigate('/partner-portal/assistance-requests/support-ticket-view', queryParams);
  }

  clearInput(): void {
    this.searchControl.setValue('');
  }
}
