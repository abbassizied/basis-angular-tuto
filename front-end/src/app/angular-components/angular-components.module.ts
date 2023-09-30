import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularComponentsRoutingModule } from './angular-components-routing.module';
import { IndexComponent } from './index/index.component';
import { CounterComponent } from '../components/counter/counter.component';

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, AngularComponentsRoutingModule, CounterComponent],
})
export class AngularComponentsModule {}
