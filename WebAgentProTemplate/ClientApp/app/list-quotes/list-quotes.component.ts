import { Component, OnInit } from '@angular/core';
import { QuotesService } from '@app/_services/quotes.service';
import { Quote } from '@app/_models/quote';
import { AlertService } from '@app/_services';


@Component({
  selector: 'app-list-quotes',
  templateUrl: './list-quotes.component.html',
  styleUrls: ['./list-quotes.component.css']
})
export class ListQuotesComponent implements OnInit {
  pageTitle: 'Quotes';
  quotes: Quote[] = [];


  constructor(private service: QuotesService, private alertService: AlertService) { }

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes() {
    this.service.getQuotes().subscribe(returnedQuotes => { this.quotes = returnedQuotes; });
  }

  deleteQuote(id: number) {
    this.service.deleteQuote(id).subscribe(
        success => {
            this.alertService.success('Quote deleted successfully.');
            this.getQuotes();
        }
    );
  }


}
