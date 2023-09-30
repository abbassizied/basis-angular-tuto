import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html', 
})
export class ContactFormComponent implements OnInit {

  label1:string ="label n°1"
  label2:string ="label n°2"
  label3:string ="label n°3"

  constructor() { }

  ngOnInit() {
  }

}
