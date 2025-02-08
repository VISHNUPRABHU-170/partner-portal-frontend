import { logOutIconConfig } from './config';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IconComponent } from '../core/components/icon/icon.component';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logOutIconConfig = logOutIconConfig;

  constructor(private authService: AuthService) {}

  onLogOut(): void {
    this.authService.onLogOut();
  }
}
