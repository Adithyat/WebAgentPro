import { Component, OnInit } from '@angular/core';
import { QuotesService } from '@app/_services/quotes.service';
import { Quote } from '@app/_models/quote';


@Component({
  selector: 'app-search-quotes',
  templateUrl: './search-quotes.component.html',
  styleUrls: ['./search-quotes.component.css']
})
export class SearchQuotesComponent implements OnInit {
  pageTitle: 'Quotes';
  quotes: Quote[];

  constructor(private service: QuotesService) { }

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes() {
    this.service.getQuotes().subscribe(returnedQuotes => { this.quotes = returnedQuotes });
  }


}
