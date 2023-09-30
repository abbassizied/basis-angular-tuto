import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  constructor(private titleService:Title) {
    this.titleService.setTitle("To-Do's List");
  }
}
