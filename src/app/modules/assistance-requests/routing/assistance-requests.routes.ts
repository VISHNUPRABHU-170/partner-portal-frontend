import { Route } from '@angular/router';

export const assistanceRequestRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'support-dashboard',
    pathMatch: 'full',
  },
  {
    path: 'support-dashboard',
    title: 'Support Dashboard',
    loadComponent: () => import('../components/support-request/support-dashboard/support-dashboard.component').then(c => c.SupportDashboardComponent),
  },
  {
    path: 'support-form',
    title: 'Support Request',
    loadComponent: () => import('../components/support-request/support-form/support-form.component').then(c => c.SupportFormComponent),
  },
  {
    path: 'support-ticket-view',
    title: 'Support Ticket',
    loadComponent: () =>
      import('../components/support-request/support-ticket-view/support-ticket-view.component').then(c => c.SupportTicketViewComponent),
  },
  {
    path: 'feature-request-dashboard',
    title: 'Feature Dashboard',
    loadComponent: () =>
      import('../components/feature-request/feature-request-dashboard/feature-request-dashboard.component').then(
        c => c.FeatureRequestDashboardComponent
      ),
  },
  {
    path: 'feature-request-form',
    title: 'Feature Request',
    loadComponent: () =>
      import('../components/feature-request/feature-request-form/feature-request-form.component').then(c => c.FeatureRequestFormComponent),
  },
  {
    path: 'feature-ticket-view',
    title: 'Feature Ticket',
    loadComponent: () =>
      import('../components/feature-request/feature-ticket-view/feature-ticket-view.component').then(c => c.FeatureTicketViewComponent),
  },
];
