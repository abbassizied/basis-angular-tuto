# @Input - Sending data to a child component

- The @Input() decorator in a child component or directive signifies that the property can receive its value from its parent component 

```
import {Component, Input, booleanAttribute} from '@angular/core'; 

@Component({
  selector: 'child-a',
  template: '<p>Bienvenue {{name}}</p>'
})
export class ChildAComponent {

  @Input() name: string;
  @Input({ required: true }) title: string = '';   // <--- Angular 16+
  @Input({required: true}) item!: string; // decorate the property with required metadata
  @Input({transform: booleanAttribute}) itemAvailability!: boolean; // decorate the property with transform
} 
```


```
// 
@Component({
  selector: 'child-a',
  template: '
  <h1>Parent Component</h1>
  <child-a name="Sam"></child-a>
  <child-a [name]="currentItem"></child-a>
  '
})
export class AppComponent {
  currentItem = 'Television';
}
```



