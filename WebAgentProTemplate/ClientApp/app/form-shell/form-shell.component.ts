import { Component, OnInit, Input } from '@angular/core';
import { FormService} from '../_services/form.service';

@Component({
  selector: 'app-form-shell',
  templateUrl: './form-shell.component.html',
  styleUrls: ['./form-shell.component.css']
})
export class FormShellComponent implements OnInit {
  @Input() form: any;

  constructor(private FormDataService: FormService) { }

  ngOnInit() {
    //this.form = this.FormDataService.getFormData();
    console.log(' loaded!');
  }

}
