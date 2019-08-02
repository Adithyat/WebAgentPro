import { Component, Output, EventEmitter } from '@angular/core';
import { SectionComponent } from './section.component';
import { DynamicFormDriverCardComponent } from './dynamic-form-driver-card/dynamic-form-driver-card.component';

@Component({
    selector: 'app-toolbar',
    templateUrl:'./toolbar.component.html',
  })

  
  export class ToolbarComponent {
    @Output() addComponentClick = new EventEmitter();
  } 