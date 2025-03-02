import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LinkComponent } from '../../../core/components/link/link.component';
import { logInLinkConfig, progressBarConfig, registerFormConfig } from './config';
import { FormBuilderComponent } from '../../../core/components/form-builder/form-builder.component';
import { AuthService } from '../../services/auth.service';
import { RegisterDataModel } from '../../models/register.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, FormBuilderComponent, LinkComponent, MatProgressBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerFormConfig = registerFormConfig;
  logInLinkConfig = logInLinkConfig;
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

  onRegister(data: RegisterDataModel) {
    this.authService.spinnerBehaviorSubject.next(true);
    this.authService.onRegister(data);
  }
}
