import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { TdDialogService } from '@covalent/core/dialogs';
import { TdJsonFormatterComponent } from '@covalent/core/json-formatter';
import { JsonLdArray } from 'jsonld/jsonld-spec';
import { BehaviorSubject, forkJoin } from 'rxjs';

import { ThemeType } from '../components';
import { GenericResource } from '../models';
import { MockApiService } from '../services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
compacted$ = new BehaviorSubject<GenericResource | null | undefined>(
  undefined
  );
  expanded$ = new BehaviorSubject<JsonLdArray | null | undefined>(undefined);
  loading$ = new BehaviorSubject<boolean>(false);

  get activeTheme(): ThemeType {
    return this._activeTheme;
  }
  set activeTheme(theme: ThemeType) {
    if (this._activeTheme !== theme) {
      this._activeTheme = theme;

      // Set/remove class on body element
      if (this._activeTheme === 'LIGHT') {
        this.renderer.addClass(document?.body, 'light-theme');
      } else {
        this.renderer.removeClass(document?.body, 'light-theme');
      }
    }
  }
  private _activeTheme: ThemeType = 'LIGHT';

  initialResource: { type: string; id: string } = {
    type: 'http://localhost:8080/aria-api/api/classification/',
    id: 'subjects_v1',
  };

  constructor(
    private dialogService: TdDialogService,
    iconRegistry: MatIconRegistry,
    private mockApiService: MockApiService,
    private renderer: Renderer2
  ) {
    iconRegistry.setDefaultFontSetClass('material-icons-outlined');
    this.displayResource(this.initialResource);
    // Hack to override default truncation limit
    (TdJsonFormatterComponent as any).KEY_MAX_LENGTH = 150;
  }

  displayResource(formValue: { type: string; id: string }): void {
    this.loading$.next(true);
    forkJoin([
      this.mockApiService.getResource(`${formValue.type}${formValue.id}`),
      this.mockApiService.expandResource(`${formValue.type}${formValue.id}`),
    ]).subscribe({
      next: ([compacted, expanded]) => {
        this.compacted$.next(compacted);
        this.expanded$.next(expanded);
      },
      error: (error: HttpErrorResponse) => {
        this.compacted$.next(null);
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
  }
}
