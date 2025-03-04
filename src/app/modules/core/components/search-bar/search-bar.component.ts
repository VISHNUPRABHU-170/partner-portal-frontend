import { Component, ElementRef, output, Renderer2, ViewChild } from '@angular/core';
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

  @ViewChild('inputRef') inputRef!: ElementRef;

  resultSelected = output<void>();

  searchControl = new FormControl<string>('');

  showCloseIcon = false;

  searchResult!: SearchResultModel | undefined;

  isSearching = false;

  constructor (
    private searchService: SearchService,
    private navigationService: NavigationService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.subscribeToSearchControl();
    this.searchControl.setValue(this.searchService.getSearchQuery());
  }

  ngAfterViewInit(): void {
    this.renderer.selectRootElement(this.inputRef.nativeElement).focus();
  }

  subscribeToSearchControl(): void {
    this.searchControl.valueChanges.subscribe((value) => {
      this.searchService.setSearchQuery(value!);
      this.searchResult = undefined;
      value = (value as string).trim();
      if (value && value !== '') {
        this.handleSearchQuery(value!);
        this.showCloseIcon = true;
      }
      else {
        this.showCloseIcon = false;
      }
    });
  }

  handleSearchQuery(value: string): void {
    this.isSearching = true;
    this.searchService.getSearchedResults().subscribe((response: any) => {
      this.isSearching = false;
      this.searchResult = response.data;
    });
  }

  onFeatureTicket(id: string): void {
    this.resultSelected.emit();
    const queryParams = { id };
    this.navigationService.navigate('/partner-portal/assistance-requests/feature-ticket-view', queryParams);
  }

  onSupportTicket(id: string): void {
    this.resultSelected.emit();
    const queryParams = { id };
    this.navigationService.navigate('/partner-portal/assistance-requests/support-ticket-view', queryParams);
  }

  clearInput(): void {
    this.searchControl.setValue('');
  }
}
