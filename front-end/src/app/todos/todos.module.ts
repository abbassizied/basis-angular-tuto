import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule, // I will use Template-driven approach for add post.
  ReactiveFormsModule, // I will use  model-driven approach for edit post.
} from '@angular/forms';

import { TodosRoutingModule } from './todos-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';

import { AddTodoComponent } from './add-todo/add-todo.component';

@NgModule({
  declarations: [TodoListComponent, AddTodoComponent],
  imports: [CommonModule, TodosRoutingModule, FormsModule, ReactiveFormsModule],
})
export class TodosModule {}
