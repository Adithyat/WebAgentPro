import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@app/_models';
import { UserService, AccountService } from '@app/_services';
import { QuoteService } from '@app/_services/quote.service';
import { Quote } from '@app/_models/quote';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    currentUser: User;
    quotes: Quote[] = [];

    constructor(
        private userService: UserService,
        private authenticationService: AccountService,
        private quoteService: QuoteService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.getQuotes();
    }

    getQuotes() {
        this.quoteService.getQuotes().subscribe(
            returnedQuote => {
                this.quotes = returnedQuote;
            });
    }
}
