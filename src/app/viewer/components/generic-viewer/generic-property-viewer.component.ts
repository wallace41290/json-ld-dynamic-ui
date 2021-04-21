import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MockApiService } from '@app/shared';
import { GenericProperty, GenericResource, PropertyType } from '@app/shared/models';
import { BehaviorSubject } from 'rxjs';

import { GenericViewer } from './generic-viewer.model';

// tslint:disable: variable-name

@Component({
  selector: 'app-generic-property-viewer',
  templateUrl: 'generic-property-viewer.component.html',
  styles: [
    `
      :host {
        display: block;
        padding: 8px;
        border-radius: 8px;
        margin-top: 8px;
      }
      .property-name {
        margin: 0;
      }
      .property-description {
        font-size: 0.9em;
        margin-left: 4px;
      }
      .expand-button {
        float: right;
        width: 28px;
        height: 28px;
        line-height: 1;
      }
      .hide {
        display: none;
      }
      mat-list {
        padding-top: 0;
      }
      footer {
        margin-top: 8px;
      }
      footer .mat-caption {
        margin: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericPropertyViewerComponent extends GenericViewer {
  /** The property to display */
  @Input()
  get property(): GenericProperty | null | undefined {
    return this._property;
  }
  set property(property: GenericProperty | null | undefined) {
    this._property = property;
    if (this.property !== null && this.property !== undefined && this.property.iri.startsWith('http')) {
      this._resolvePropertyMetadata();
    }
  }
  private _property: GenericProperty | null | undefined;

  /** Whether the property's metadata is loading */
  loadingPropertyMetadata$ = new BehaviorSubject<boolean>(false);
  /** Metadata about the property */
  propertyMetadata$ = new BehaviorSubject<GenericResource | undefined>(undefined);
  /** Number of properties visible. */
  propsVisible = 10;

  constructor(private apiService: MockApiService) {
    super();
  }

  /**
   * Show more visible properties
   * @param num number of properties to show
   */
  showMore(num: number): void {
    this.propsVisible += num;
  }

  _trackByPropertyType<T extends PropertyType>(index: number, item: T): any {
    if ('@id' in item) {
      return item['@id'];
    }
    return index;
  }

  private _resolvePropertyMetadata(): void {
    this.loadingPropertyMetadata$.next(true);
    this.apiService
      // tslint:disable-next-line: no-non-null-assertion
      .getResource(this.property!.iri)
      // tslint:disable-next-line: deprecation
      .subscribe(
        (response) => {
          this.propertyMetadata$.next(response.response);
          this.loadingPropertyMetadata$.next(false);
        },
        (error) => {
          this.propertyMetadata$.next(undefined);
          this.loadingPropertyMetadata$.next(false);
          console.error('Failed to resolve property model', error);
        }
      );
  }
}
