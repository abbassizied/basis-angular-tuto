import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

const angularComponentsRoutes: Routes = [
  { path: '', component: IndexComponent, data: { title: 'Angular Components Tutos' } },
];

@NgModule({
  imports: [RouterModule.forChild(angularComponentsRoutes)],
  exports: [RouterModule]
})
export class AngularComponentsRoutingModule { }
