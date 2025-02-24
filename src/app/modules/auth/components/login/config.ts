import { ButtonComponentModel } from '../../../core/components/button/button.component.model';
import {
  ComponentType,
  FormBuilderComponentModel,
  FormControlModel,
  FormValidators,
} from '../../../core/components/form-builder/form-builder.component.model';
import { InputComponentModel, InputType } from '../../../core/components/input/input.component.model';
import { LinkComponentModel } from '../../../core/components/link/link.component.model';
import { ProgressBarComponentModel } from '../../../core/components/progress-bar/progress-bar.component.model';

const userNameInputConfig: InputComponentModel = {
  label: 'Enter Email ID',
  type: InputType.TEXT,
};

const userNameFormControlConfig: FormControlModel = {
  name: 'emailID',
  config: userNameInputConfig,
  componentType: ComponentType.INPUT,
  validators: [FormValidators.REQUIRED],
};

const passwordInputConfig: InputComponentModel = {
  label: 'Enter Password',
  type: InputType.PASSWORD,
};

const passwordFormControlConfig: FormControlModel = {
  name: 'password',
  config: passwordInputConfig,
  componentType: ComponentType.INPUT,
  validators: [FormValidators.REQUIRED],
};

const logInButtonConfig: ButtonComponentModel = {
  label: 'Login',
  routerLink: 'partner-portal',
};

export const registerLinkConfig: LinkComponentModel = {
  label: 'Register',
  routerLink: '/register',
};

export const loginFormConfig: FormBuilderComponentModel = {
  formGroup: [userNameFormControlConfig, passwordFormControlConfig],
  formFooter: [logInButtonConfig],
};

export const progressBarConfig: ProgressBarComponentModel = {
  diameter: 50,
  className: 'spinner-center',
};
