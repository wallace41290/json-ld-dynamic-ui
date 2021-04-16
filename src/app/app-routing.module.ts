import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'compacted',
    loadChildren: () => import('./compacted/compacted.module').then((m) => m.CompactedModule),
  },
  {
    path: 'editor',
    loadChildren: () => import('./editor/editor.module').then((m) => m.EditorModule),
  },
  {
    path: 'expanded',
    loadChildren: () => import('./expanded/expanded.module').then((m) => m.ExpandedModule),
  },
  {
    path: 'viewer',
    loadChildren: () => import('./viewer/viewer.module').then((m) => m.ViewerModule),
  },
  { path: '', pathMatch: 'full', redirectTo: '/viewer' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
