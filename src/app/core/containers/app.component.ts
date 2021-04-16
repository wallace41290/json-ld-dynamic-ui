import { ChangeDetectionStrategy, Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { NavTabItem, ResourceForm } from '@app/shared/models';
import { StoreService } from '@app/shared/services';
import { TdJsonFormatterComponent } from '@covalent/core/json-formatter';

import { ThemeType } from '../components';

// tslint:disable: variable-name

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
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

  initialResource: ResourceForm = {
    type: 'http://localhost:8080/aria-api/api/classification/',
    id: 'subjects_v1',
  };

  tabs: NavTabItem[] = [
    new NavTabItem('code', 'Compacted (default)', '/compacted'),
    new NavTabItem('code', 'Expanded', '/expanded'),
    new NavTabItem('menu_book', 'Viewer', '/viewer'),
    new NavTabItem('edit', 'Editor', '/editor'),
  ];

  constructor(iconRegistry: MatIconRegistry, private renderer: Renderer2, public store: StoreService) {
    iconRegistry.setDefaultFontSetClass('material-icons-outlined');
    // Hack to override default truncation limit
    (TdJsonFormatterComponent as any).KEY_MAX_LENGTH = 150;
  }

  ngOnInit(): void {
    // Display the initially set resource
    this.store.loadResource(this.initialResource);

    // Get initial resource options
    this.store.updateResourceOptions('http://localhost:8080/aria-api/api/classification/');
  }
}
