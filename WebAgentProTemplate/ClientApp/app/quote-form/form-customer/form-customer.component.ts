import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/_services';
import { QuoteService } from '@app/_services/quote.service';
import { Quote } from '@app/_models/quote';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css']
})
export class FormCustomerComponent implements OnInit {
    private quoteIdSubscription: Subscription;
    quote: Quote = new Quote;

    validCustomer: boolean;

  constructor(
    private quoteService: QuoteService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }



  ngOnInit() {


    this.route.queryParams.subscribe(
      params => {
          // this.widgetID = +params['id'];
          this.quote.quoteId = +params['id'] || null;
          console.log(this.quote.quoteId);
          if (this.quote.quoteId) {
            this.editQuote();
          } else {
            this.newQuote();
          }
        });

      this.validCustomer = false;

  }

  newQuote() {
    //console.log('new');
      this.quote = new Quote;
      this.quote.quoteStatus = 0;
      if (this.mobilecheck()) {
          this.quote.createdOnMobile = true;
          console.log("You are on mobile!")
      }
      else {
          this.quote.createdOnMobile = false;
          console.log("You are on desktop!")
      }
  }

    mobilecheck = function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor);
        return check;
    };

  editQuote() {
    // console.log(this.route.params);
    // this.router.navigate([`/quotes/${this.quote.quoteId}`]);
    //console.log('edit');
    this.quoteService.getQuote(this.quote.quoteId)
    .subscribe(
        returnedQuote => {
            if (returnedQuote.quoteStatus) {
                this.router.navigate(['/']);
            }
            this.quote = returnedQuote;
            console.log(returnedQuote);
        },
        error => {
              this.newQuote();
              this.alertService.error('Error: cannot access quotes of other agents.', false);
              this.router.navigate(['/']);
          })
        ;
  }

  save() {
    console.log(this.quote.quoteId);
    if (this.quote.quoteId) {
      //console.log('savechange');
      this.saveChange();
    } else {
      
      //console.log('savecreate');
      this.saveCreate();
    }
  }


  saveCreate() {
    console.log('savecreate');
   
    this.quoteService.postQuote(this.quote).subscribe(
        returnedQuote => {
            console.log(returnedQuote);
            // this.quoteService.setQId(returnedQuote.quoteId);
            // this.newQuote();
            this.alertService.success('Quote created.', false);
            // const url = this.router.createUrlTree([returnedQ`uote.quoteId], {relativeTo: this.route}).toString();
            // console.log(url);
            // tslint:disable-next-line: no-unused-expression
            // this.location.replaceState[url];
            // this.router.navigate([`/quotes/${returnedQuote.quoteId}`]);
            this.router.navigate(['quotes'], { queryParams: { id: returnedQuote.quoteId } });
        },
        error => {
          this.newQuote();
          this.alertService.error('Quote create failed.', false);
        });
  }

  saveChange() {
    console.log('savechange');
    this.quoteService.putQuote(this.quote, this.quote.quoteId).subscribe(
          response => {
            console.log(response);
            // this.newQuote();
            this.alertService.success('Quote saved.', false);
          },
          error => {
            this.router.navigate(['quotes']);
            this.alertService.error('Quote save failed.', false);
          });
  }

}
