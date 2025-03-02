import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { ChipComponentModel } from '../chip/chip.component.model';

@Component({
  selector: 'app-chip-list',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './chip-list.component.html',
  styleUrl: './chip-list.component.scss',
})
export class ChipListComponent {
  @Input() data!: ChipComponentModel[];
}
