import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { ThemeType } from '../theme-toggle';
import { ResourceOption } from './resource-option.model';

// tslint:disable: variable-name
@UntilDestroy()
@Component({
  selector: 'app-resource-form',
  templateUrl: 'resource-form.component.html',
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
  static ngAcceptInputType_options: ResourceOption[] | null | undefined;
  static ngAcceptInputType_pending: BooleanInput;

  @Input() activeTheme: ThemeType = 'DARK';

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

  @Input()
  get options(): ResourceOption[] {
    return this._options;
  }
  set options(options: ResourceOption[]) {
    this._options = options || [];
    this._options$.next(this._options);
  }
  private _options: ResourceOption[] = [];

  /** Whether the form is pending; in progress. */
  @Input()
  set pending(value: boolean) {
    this._pending = coerceBooleanProperty(value);
    if (this._pending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  get pending(): boolean {
    return this._pending;
  }
  private _pending = false;

  @Output() submitted = new EventEmitter<{ type: string; id: string }>();
  @Output() typeChange = new EventEmitter<
    | 'http://localhost:8080/aria-api/api/classification/'
    | 'http://localhost:8080/aria-api/api/concordance/'
  >();

  filteredOptions$: Observable<ResourceOption[]>;

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

  private _options$ = new BehaviorSubject<ResourceOption[]>(this.options);

  constructor(private fb: FormBuilder) {
    this.filteredOptions$ = combineLatest([
      // tslint:disable-next-line: no-non-null-assertion
      this.form.get('id')!.valueChanges.pipe(distinctUntilChanged()),
      this._options$,
    ]).pipe(
      untilDestroyed(this),
      map(([idValue]) => this._filter(idValue))
    );
  }

  handleSubmit(): void {
    if (this.form.valid) {
      const formValue: { type: string; id: string } = this.form.value;
      this.submitted.emit(formValue);
    }
  }

  handleTypeChange(event: MatSelectChange): void {
    this.form.get('id')?.reset('');
    this.typeChange.emit(event.value);
  }

  private _filter(value: string | null | undefined): ResourceOption[] {
    const filterValue = (value || '').toLowerCase();

    return this.options.filter(
      (option) =>
        option.name.toLowerCase().includes(filterValue) ||
        option.id.toLowerCase().includes(filterValue)
    );
  }
}
