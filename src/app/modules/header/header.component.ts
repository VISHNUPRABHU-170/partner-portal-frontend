import { logOutIconConfig } from './config';
import { Component, ViewContainerRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IconComponent } from '../core/components/icon/icon.component';
import { AuthService } from '../auth/services/auth.service';
import { SearchBarComponent } from '../core/components/search-bar/search-bar.component';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logOutIconConfig = logOutIconConfig;

  constructor (
    private authService: AuthService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef
  ) { }

  onLogOut(): void {
    this.authService.onLogOut();
  }

  openSearchResult(): void {
    let config = new OverlayConfig();

    config.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .top(`10px`);

    config.hasBackdrop = true;

    let overlayRef = this.overlay.create(config);

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });

    overlayRef.attach(new ComponentPortal(SearchBarComponent, this.viewContainerRef));
  }
}
