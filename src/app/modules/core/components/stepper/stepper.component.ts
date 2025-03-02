import { Component, Input, OnChanges, OnInit, output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { StepperComponentModel, StepperModel } from './stepper.component.model';
import { FormBuilderComponentModel } from '../form-builder/form-builder.component.model';
import { FormBuilderService } from '../../services/form-builder/form-builder.service';
import { DynamicFormControlDirective } from '../../directives/dynamic-form-control/dynamic-form-control.directive';
import { MatButtonModule } from '@angular/material/button';
import { FeatureTicketModel } from '../../../assistance-requests/models/feature-ticket.model';
import { SupportTicketModel } from '../../../assistance-requests/models/support-ticket.model';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [MatStepperModule, ReactiveFormsModule, DynamicFormControlDirective, MatButtonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent implements OnInit, OnChanges {
  // Input property to accept stepper configuration data from the parent component.
  @Input() data!: StepperComponentModel;

  @Input() formData!: SupportTicketModel | FeatureTicketModel;

  // Output event to emit the form values when the form is successfully submitted.
  event = output<any>();

  // ViewChild to access the MatStepper instance for navigation control.
  @ViewChild('stepper') stepper!: MatStepper;

  // FormGroup to manage the form controls dynamically.
  formGroup = new FormGroup([]);

  constructor(private formBuilder: FormBuilderService) {}

  /**
   * Lifecycle hook initializes the form group with dynamic controls.
   */
  ngOnInit(): void {
    const config: FormBuilderComponentModel = {
      formGroup: [],
      formFooter: [],
    };
    this.data.stepper.forEach((stepper: StepperModel) => {
      config.formGroup = [...config.formGroup, ...stepper.formControls];
    });
    this.formGroup = this.formBuilder.createFormGroup(this.formGroup, config);
  }

  ngOnChanges(): void {
    if(this.formData) {
      this.formGroup.patchValue(this.formData as any);
    }
  }

  /**
   * Navigates to the section with validation errors to guide the user
   * to the section needing attention.
   */
  navigateToErrorSection(): void {
    this.data.stepper.find((stepper, index) => {
      const hasError = stepper.formControls.some(control => {
        if (this.formGroup.get(control.name)?.errors) {
          this.stepper.selectedIndex = index;
          return true;
        }
        return false;
      });
      return hasError;
    });
  }

  /**
   * Handles form submission. Emits the form data if the form is valid.
   * If invalid, navigates to the error section and marks all controls as touched.
   */
  onSubmit(): void {
    if (this.formGroup.valid) {
      this.event.emit(this.formGroup.value);
      this.stepper.reset();
    } else {
      this.navigateToErrorSection();
      this.formGroup.markAllAsTouched();
    }
  }
}
