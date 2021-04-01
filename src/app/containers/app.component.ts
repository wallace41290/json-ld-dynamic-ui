import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { TdDialogService } from '@covalent/core/dialogs';
import { JsonLdArray } from 'jsonld/jsonld-spec';
import { BehaviorSubject } from 'rxjs';

import { MockApiService } from '../services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @HostBinding('class.light-theme') lightThemeEnabeled = false;

  expanded$ = new BehaviorSubject<JsonLdArray | null | undefined>(undefined);
  loading$ = new BehaviorSubject<boolean>(false);

  activeTheme: 'DARK' | 'LIGHT' = 'DARK';
  themeOptions = {
    LIGHT: {
      value: 'LIGHT',
      icon: 'light_mode',
      tooltip: 'Switch to dark mode',
    },
    DARK: { value: 'DARK', icon: 'dark_mode', tooltip: 'Switch to light mode' },
  };

  initialResource: { type: string; id: string } = {
    type: 'http://localhost:8080/aria-api/api/classification/',
    id: 'subjects_v1',
  };

  constructor(
    private dialogService: TdDialogService,
    iconRegistry: MatIconRegistry,
    private mockApiService: MockApiService
  ) {
    iconRegistry.setDefaultFontSetClass('material-icons-outlined');
    this.displayResource(this.initialResource);
  }

  displayResource(formValue: { type: string; id: string }): void {
    this.loading$.next(true);
    this.mockApiService
      .expandResource(`${formValue.type}${formValue.id}`)
      .subscribe({
        next: (expanded) => this.expanded$.next(expanded),
        error: (error: HttpErrorResponse) => {
          this.expanded$.next(null);
          this.loading$.next(false);
          console.error(error);
          if (error.status === 0) {
            this.dialogService.openAlert({
              title: 'Server Error',
              disableClose: true,
              message:
                'The server is not responding. Are you sure the Ariā API is running at "http://localhost:8080/aria-api/api"?',
            });
          } else {
            this.dialogService.openAlert({
              title: `${error.error.code} Error`,
              disableClose: true,
              message: error.error.errors?.join(','),
            });
          }
        },
        complete: () => this.loading$.next(false),
      });
  }

  ngOnInit(): void {
    // Display the initially set resource
    this.displayResource(this.initialResource);

    // TODO dynamic UI display
    // TODO resolve terms
  }

  toggleTheme(): void {
    this.activeTheme = this.activeTheme === 'LIGHT' ? 'DARK' : 'LIGHT';
    this.lightThemeEnabeled = this.activeTheme === 'LIGHT';
  }
}
