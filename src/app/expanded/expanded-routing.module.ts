import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpandedComponent } from './expanded.component';

const routes: Routes = [{ path: '', component: ExpandedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpandedRoutingModule { }
