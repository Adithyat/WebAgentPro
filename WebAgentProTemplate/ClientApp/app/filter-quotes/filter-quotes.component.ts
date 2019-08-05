import { Component, OnInit } from '@angular/core';
import { QuotesService } from '@app/_services/quotes.service';
import { Quote } from '@app/_models/quote';

@Component({
  selector: 'app-filter-quotes',
  templateUrl: './filter-quotes.component.html',
  styleUrls: ['./filter-quotes.component.css']
})

export class FilterQuotesComponent implements OnInit {

  filteredProducts: Quote[] = [];
  _listFilter = '';

  ngOnInit() {
  }

  constructor() { }
  /*
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }




  
  performFilter(filterBy: string): Quote[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Quote) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  */

}
