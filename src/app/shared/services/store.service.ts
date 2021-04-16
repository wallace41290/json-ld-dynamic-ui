import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResource, OrArray, ResourceForm, ResourceOption } from '@app/shared/models';
import { TdDialogService } from '@covalent/core/dialogs';
import { NodeObject } from 'jsonld';
import { JsonLdArray } from 'jsonld/jsonld-spec';
import { BehaviorSubject, forkJoin } from 'rxjs';

import { MockApiService } from './mock-api.service';

// tslint:disable: variable-name

// FOR Subscribe:
// tslint:disable: deprecation

@Injectable({ providedIn: 'root' })
export class StoreService {
  private readonly _compacted = new BehaviorSubject<GenericResource | null | undefined>(undefined);
  readonly compacted$ = this._compacted.asObservable();
  get compacted(): GenericResource | null | undefined {
    return this._compacted.getValue();
  }
  set compacted(compacted: GenericResource | null | undefined) {
    this._compacted.next(compacted);
  }

  private readonly _expanded = new BehaviorSubject<JsonLdArray | null | undefined>(undefined);
  readonly expanded$ = this._expanded.asObservable();
  get expanded(): JsonLdArray | null | undefined {
    return this._expanded.getValue();
  }
  set expanded(expanded: JsonLdArray | null | undefined) {
    this._expanded.next(expanded);
  }

  private readonly _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable();
  get loading(): boolean {
    return this._loading.getValue();
  }
  set loading(loading: boolean) {
    this._loading.next(loading);
  }

  private readonly _options = new BehaviorSubject<ResourceOption[]>([]);
  readonly options$ = this._options.asObservable();
  get options(): ResourceOption[] {
    return this._options.getValue();
  }
  set options(options: ResourceOption[]) {
    this._options.next(options);
  }

  private readonly _rendering = new BehaviorSubject<boolean>(false);
  readonly rendering$ = this._rendering.asObservable();
  get rendering(): boolean {
    return this._rendering.getValue();
  }
  set rendering(rendering: boolean) {
    this._rendering.next(rendering);
  }

  constructor(private dialogService: TdDialogService, private mockApiService: MockApiService) {}

  loadResource(formValue: ResourceForm): void {
    this.loading = true;
    forkJoin([
      this.mockApiService.getResource(`${formValue.type}${formValue.id}`),
      this.mockApiService.expandResource(`${formValue.type}${formValue.id}`),
    ]).subscribe({
      next: ([compacted, expanded]) => {
        if (compacted.warning) {
          this.dialogService
            .openConfirm({ title: 'Warning', message: compacted.warning, disableClose: true, isDestructive: true, acceptButton: 'PROCEED' })
            .afterClosed()
            .subscribe((accept: boolean) => {
              if (accept) {
                this.rendering = true;
                this.compacted = null;
                this.expanded = null;
                setTimeout(() => {
                  this.compacted = compacted.response;
                  this.expanded = expanded;
                  this.rendering = false;
                }, 1);
              } else {
                this.compacted = undefined;
                this.expanded = undefined;
              }
            });
        } else {
          this.compacted = compacted.response;
          this.expanded = expanded;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.compacted = undefined;
        this.expanded = undefined;
        this.loading = false;

        console.error(error);

        if (error.status === 0) {
          this.dialogService.openAlert({
            title: 'Server Error',
            disableClose: true,
            message: 'The server is not responding. Are you sure the Ariā API is running at "http://localhost:8080/aria-api/api"?',
          });
        } else {
          this.dialogService.openAlert({
            title: `${error.error.code} Error`,
            disableClose: true,
            message: error.error.errors?.join(','),
          });
        }
      },
      complete: () => (this.loading = false),
    });
  }

  updateResourceOptions(
    value: 'http://localhost:8080/aria-api/api/classification/' | 'http://localhost:8080/aria-api/api/concordance/'
  ): void {
    if (value === 'http://localhost:8080/aria-api/api/classification/') {
      this.mockApiService.getClassifications().subscribe((classifications) => {
        this.mapToResourceOptions(classifications, 'http://localhost:8080/aria-api/api/classification/');
      });
    } else {
      this.mockApiService.getConcordances().subscribe((concordances) => {
        this.mapToResourceOptions(concordances, 'http://localhost:8080/aria-api/api/concordance/');
      });
    }
  }

  private mapToResourceOptions(objects: OrArray<NodeObject> | undefined, replaceString: string): void {
    if (Array.isArray(objects)) {
      this.options = objects
        .filter((c) => c['@id'])
        .map((c) => {
          const id: string = (c['@id'] as string).replace(replaceString, '');
          let name = c.abbreviation as string | undefined;
          if (!name) {
            name = c.name as string | undefined;
          } else {
            if (c.versionNumber) {
              name += ` ${c.versionNumber}`;
            }
          }
          return new ResourceOption(id, name || id);
        });
    } else {
      this.options = [];
    }
  }
}
