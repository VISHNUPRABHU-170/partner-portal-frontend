import { MatCardModule } from '@angular/material/card';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { LinkComponent } from '../../../core/components/link/link.component';
import { loginFormConfig, progressBarConfig, registerLinkConfig } from './config';
import { FormBuilderComponent } from '../../../core/components/form-builder/form-builder.component';
import { AuthService } from '../../services/auth.service';
import { LoginDataModel } from '../../models/login.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, FormBuilderComponent, LinkComponent, MatProgressBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginFormConfig = loginFormConfig;
  registerLinkConfig = registerLinkConfig;
  progressBarConfig = progressBarConfig;
  showSpinner!: boolean;

  constructor(
    private authService: AuthService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    const Subscription = this.authService.spinnerBehaviorSubject.subscribe((status: boolean) => {
      this.showSpinner = status;
    });
    this.destroyRef.onDestroy(() => {
      Subscription?.unsubscribe();
    });
  }

  onLogIn(data: LoginDataModel) {
    this.authService.spinnerBehaviorSubject.next(true);
    this.authService.onLogin(data);
  }
}
