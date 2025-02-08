import { ButtonComponentModel } from '../../../../core/components/button/button.component.model';
import { IconComponentModel } from '../../../../core/components/icon/icon.component.model';
import { ProgressBarComponentModel } from '../../../../core/components/progress-bar/progress-bar.component.model';

export const backIconConfig: IconComponentModel = {
  name: 'arrow_back',
  routerLink: '/partner-portal/assistance-requests/feature-request-dashboard',
};

export const updateButtonConfig: ButtonComponentModel = {
  label: 'Update Ticket',
  routerLink: '',
};

export const progressBarConfig: ProgressBarComponentModel = {
  diameter: 60,
  className: 'spinner-center',
};
