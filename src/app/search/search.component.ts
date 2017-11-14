import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Search} from '../model';

import {ApiService  } from '../api.service';
import { DealsComponent } from '../deals/deals.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

   constructor(private apiService: ApiService, private dealsComponent: DealsComponent, private router: Router) { }
  search: Search = new Search();

  error: any= {isError: false, errorMessages: ''};


  ngOnInit() {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(new Date().getDate() + 2);
    this.search.dateFrom = tomorrow;
    this.search.dateTo = dayAfterTomorrow;
  }

  onSelect(dateFrom: Date, dateTo: Date, city: string) {
    this.error = {isError: false, errorMessages: []};
    this.validateTwoDates(dateFrom, dateTo);
    this.validateRequiredFields(city);

    if (this.error.isError) {
     return;
    }

    const searchCriteria = new Search();
    searchCriteria.dateFrom = dateFrom;
    searchCriteria.dateTo = dateTo;
    searchCriteria.destCity = city;

    this.validateTwoDates(dateFrom, dateTo);

    this.apiService.setSearchCriteria(searchCriteria);
    this.apiService.trigger();

    this.router.navigateByUrl('/deals');
  }

validateRequiredFields(str: string) {
  if (str === undefined || str === '') {
      this.error.isError = true;
      this.appendErrorMessage('Required field is not populated');
  }


}
validateTwoDates(date1: Date, date2: Date) {
   this.error.isError = false;
   if (date1 >= date2) {
      this.error.isError = true;
      this.appendErrorMessage('Until Date can\'t be before start date');
   }
  if (date1 <= new Date()) {
    this.error.isError = true;
     this.appendErrorMessage('From Date can\'t be before Today');
  }
  if (date2 <= new Date()) {
    this.error.isError = true;
    this.appendErrorMessage('Until Date can\'t be before Today');
  }
}

  appendErrorMessage(msg: string) {
    if (this.error.errorMessages !== '') {
      this.error.errorMessages = this.error.errorMessages + '\n';
    }
    this.error.errorMessages += msg;
  }

}



