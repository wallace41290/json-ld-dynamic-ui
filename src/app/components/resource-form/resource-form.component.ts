import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// tslint:disable: variable-name

@Component({
  selector: 'app-resource-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <mat-form-field [color]="activeTheme === 'LIGHT' ? 'primary' : 'accent'">
        <mat-label>Resource Type</mat-label>
        <mat-select formControlName="type">
          <mat-option
            *ngFor="let option of resourceTypeOptions"
            [value]="option.value"
          >
            {{ option.label }}
          </mat-option>
        </mat-select>
        <mat-error>Resource type is required</mat-error>
      </mat-form-field>
      <mat-form-field [color]="activeTheme === 'LIGHT' ? 'primary' : 'accent'">
        <mat-label>ID</mat-label>
        <input matInput type="text" formControlName="id" />
        <mat-error>ID is required</mat-error>
      </mat-form-field>
      <button
        aria-label="Display resource"
        color="accent"
        mat-mini-fab
        type="submit"
      >
        <mat-icon>auto_fix_hight</mat-icon>
      </button>
    </form>
  `,
  styles: [
    `
      form {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      form > * {
        margin-left: 8px;
        margin-right: 8px;
      }
      mat-form-field {
        margin-bottom: -1.34375em;
      }
      button {
        align-self: flex-start;
        margin-top: 6px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceFormComponent {
  @Input() activeTheme: 'LIGHT' | 'DARK' = 'DARK';

  @Input()
  get formValue(): { type: string; id: string } | undefined {
    return this._formValue;
  }
  set formValue(value: { type: string; id: string } | undefined) {
    this._formValue = value;
    if (this.formValue) {
      this.form.patchValue(this.formValue);
    } else {
      this.form.reset();
    }
  }
  private _formValue: { type: string; id: string } | undefined;

  @Output() submitted = new EventEmitter<{ type: string; id: string }>();

  form: FormGroup = this.fb.group({
    type: ['', Validators.required],
    id: ['', Validators.required],
  });

  resourceTypeOptions = [
    {
      label: 'Classification',
      value: 'http://localhost:8080/aria-api/api/classification/',
    },
    {
      label: 'Concordance',
      value: 'http://localhost:8080/aria-api/api/concordance/',
    },
  ];

  constructor(private fb: FormBuilder) {}

  handleSubmit(): void {
    if (this.form.valid) {
      const formValue: { type: string; id: string } = this.form.value;
      this.submitted.emit(formValue);
    }
  }
}
