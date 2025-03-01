import { ButtonComponentModel } from '../../../core/components/button/button.component.model';
import {
  ComponentType,
  FormBuilderComponentModel,
  FormControlModel,
  FormGroupValidatorModel,
  FormValidators,
} from '../../../core/components/form-builder/form-builder.component.model';
import { InputComponentModel, InputType } from '../../../core/components/input/input.component.model';
import { LinkComponentModel } from '../../../core/components/link/link.component.model';
import { ProgressBarComponentModel } from '../../../core/components/progress-bar/progress-bar.component.model';

const userNameInputConfig: InputComponentModel = {
  label: 'Enter Email ID',
  type: InputType.EMAIL,
};

const userNameFormControlConfig: FormControlModel = {
  name: 'emailID',
  config: userNameInputConfig,
  componentType: ComponentType.INPUT,
  validators: [FormValidators.REQUIRED, FormValidators.EMAIL],
};

const passwordInputConfig: InputComponentModel = {
  label: 'Enter Password',
  type: InputType.PASSWORD,
};

const passwordFormControlConfig: FormControlModel = {
  name: 'password',
  config: passwordInputConfig,
  componentType: ComponentType.INPUT,
  validators: [FormValidators.REQUIRED, FormValidators.PASSWORD],
};

const confirmPasswordInputConfig: InputComponentModel = {
  label: 'Confirm Password',
  type: InputType.PASSWORD,
};

const confirmPasswordFormControlConfig: FormControlModel = {
  name: 'confirmPassword',
  config: confirmPasswordInputConfig,
  componentType: ComponentType.INPUT,
  validators: [FormValidators.REQUIRED, FormValidators.PASSWORD],
};

const registerButtonConfig: ButtonComponentModel = {
  label: 'Register',
  routerLink: 'partner-portal',
};

export const logInLinkConfig: LinkComponentModel = {
  label: 'Login',
  routerLink: '/login',
};

const formGroupValidatorConfig: FormGroupValidatorModel = {
  validatorType: FormValidators.MATCH_FIELD,
  config: {
    control1: 'password',
    control2: 'confirmPassword',
  },
};

export const registerFormConfig: FormBuilderComponentModel = {
  formGroup: [userNameFormControlConfig, passwordFormControlConfig, confirmPasswordFormControlConfig],
  formFooter: [registerButtonConfig],
  validators: formGroupValidatorConfig,
};

export const progressBarConfig: ProgressBarComponentModel = {
  diameter: 50,
  className: 'spinner-center',
};
