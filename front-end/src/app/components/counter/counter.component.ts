import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
  @Input() counter: number = 0;
  @Output() counterChange = new EventEmitter<number>();

  dec() {
    this.counterChange.emit(--this.counter);
  }
  inc() {
    this.counterChange.emit(++this.counter);
  }
}
