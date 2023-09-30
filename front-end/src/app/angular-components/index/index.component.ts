import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  counter = 0;
  @ViewChild('myInput') input!: ElementRef;
  @ViewChildren('child1, child2') children!: QueryList<ElementRef>;
  child1Value: string = '';

  inc() {
    this.counter++;
  }
  dec() {
    this.counter--;
  }
  onCounterChange(counter: number) {
    this.counter = counter;
  }

  changeValue() {
    this.input.nativeElement.value = 'Nouvelle valeur';
  }

  ngAfterViewInit() {
    console.log(this.children); // QueryList containing the two div elements
  }

  getChildOneValue() {
    this.child1Value = this.children.first.nativeElement.innerText;
  }

  clearChildOneValue() {
    this.child1Value = '';
  }
}
