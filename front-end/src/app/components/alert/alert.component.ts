import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Alert, AlertType } from './alert.model';

@Component({
  selector: 'alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input() alert: Alert = new Alert(AlertType.Link, '');
  @Input() isVisible: boolean = true;
  @Output() onClose = new EventEmitter();

  dismiss() {
    // console.log('+++++++++++');
    this.onClose.emit(!this.isVisible); // reverse the value of property
  }
}
