import { Component, OnInit, OnDestroy } from '@angular/core';
import {ApiService} from '../api.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import {DateRange, Hotel, Search, Offer} from '../model';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  offers: Offer[];


  constructor(private apiService: ApiService, private router: Router) { }

   public retrieveOffers(): void {
   this.subscription = this.apiService.getHotels().subscribe(
     deals => this.setOffers(deals)
   );
  }


  private setOffers(offers: Offer[]) {
    this.offers = offers;
  }

  clearSearch() {
    this.apiService.setSearchCriteria(new Search());
    this.retrieveOffers();
    this.router.navigateByUrl('/deals');
  }

  ngOnInit() {
    this.retrieveOffers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
