import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { TdDialogService } from '@covalent/core/dialogs';
import { JsonLdArray } from 'jsonld/jsonld-spec';
import { BehaviorSubject, Subject } from 'rxjs';

import { MockApiService } from '../services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @HostBinding('class.light-theme') lightThemeEnabeled = false;

  expanded$ = new Subject<JsonLdArray>();
  loading$ = new BehaviorSubject<boolean>(false);

  form: FormGroup;

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

  activeTheme: 'DARK' | 'LIGHT' = 'DARK';
  themeOptions = {
    LIGHT: {
      value: 'LIGHT',
      icon: 'light_mode',
      tooltip: 'Switch to dark mode',
    },
    DARK: { value: 'DARK', icon: 'dark_mode', tooltip: 'Switch to light mode' },
  };

  constructor(
    private _dialogService: TdDialogService,
    private fb: FormBuilder,
    iconRegistry: MatIconRegistry,
    private mockApiService: MockApiService
  ) {
    iconRegistry.setDefaultFontSetClass('material-icons-outlined');

    this.form = this.fb.group({
      type: [this.resourceTypeOptions[0].value, Validators.required],
      id: ['subjects_v1', Validators.required],
    });
  }

  displayResource(): void {
    if (this.form.valid) {
      this.loading$.next(true);
      const formValue: { type: string; id: string } = this.form.value;
      this.mockApiService
        .expandResource(`${formValue.type}${formValue.id}`)
        .subscribe({
          next: (expanded) => this.expanded$.next(expanded),
          error: (error: HttpErrorResponse) => {
            console.error(error);
            if (error.status === 0) {
              this._dialogService.openAlert({
                title: 'Server Error',
                disableClose: true,
                message:
                  'The server is not responding. Are you sure the Ariā API is running at "http://localhost:8080/aria-api/api"?',
              });
            }
          },
          complete: () => this.loading$.next(false),
        });
    }
  }

  ngOnInit(): void {
    // Display the initially set resource
    this.displayResource();

    // TODO dynamic UI display
    // TODO resolve terms
  }

  toggleTheme(): void {
    this.activeTheme = this.activeTheme === 'LIGHT' ? 'DARK' : 'LIGHT';
    this.lightThemeEnabeled = this.activeTheme === 'LIGHT';
  }
}
