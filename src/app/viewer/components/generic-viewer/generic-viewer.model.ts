import { Directive, Input } from '@angular/core';

// tslint:disable: variable-name
// tslint:disable: directive-class-suffix

@Directive()
export abstract class GenericViewer {
  /**
   * Property nested depth from the root resource.
   * i.e. depth of 0 indicates this is a direct child of the root resource.
   */
  @Input()
  get depth(): number {
    return this._depth;
  }
  set depth(depth: number) {
    this._depth = depth;
    // Start items with a depth greater than one as collapsed
    if (this.depth > 2) {
      this.expanded = false;
    }
  }
  private _depth = 0;

  /** Whether the contents are expanded */
  expanded = true;
}
