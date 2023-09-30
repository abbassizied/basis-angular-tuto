# @Output() - Sending data to a parent component

- The @Output() decorator in a child component or directive lets data flow from the child to the parent.
- EventEmitter : Emettre l'événement aux composants parents
- @Output : Décorateur indiquant la propriété envoyant l'information.

### child component
``` 
import {Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'child',
  template: '
	<label for="item-input">Add an item:</label>
	<input type="text" id="item-input" #newItem>
	<button type="button" (click)="addNewItem(newItem.value)">Add to parent's list</button>
  '
})
export class ChildComponent {
	@Output() newItemEvent = new EventEmitter<string>();
	n: number = 0;
	@Output() numberChange: EventEmitter<number> = new EventEmitter();
 
	addNewItem(value: string) {
      this.newItemEvent.emit(value);
	}

  up() {
    this.n++;
    this.numberChange.emit(this.n);
  }

} 
```



### parent component
```

 
@Component({
  selector: 'parent',
  template: '
	<div>
		<count (numberChange)="multiplicate($event)"></count>
		{{result}}
	</div>  
  
	<child (newItemEvent)="addItem($event)"></child>
 
	<ul>
		<li *ngFor="let item of items">{{item}}</li>
	</ul> 
  '
})
export class ParentComponent {
	result: number = 0;
	items = ['item1', 'item2', 'item3', 'item4'];

	multiplicate(val: number) {
		this.result = val * 2;
	}

	addItem(newItem: string) {
      this.items.push(newItem);
	} 
} 
```









