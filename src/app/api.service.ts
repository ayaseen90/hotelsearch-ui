import { Injectable } from '@angular/core';

import {} from './deal/deal';
import { Offer, DateRange, Hotel, Search } from './model';

// import { Http, Response, Headers } from '@angular/http';
import { HttpParams, HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
 searchCriteria: Search = new Search();

   private baseUrl = environment.hotelSearchAPI;


  getHotels(): Observable<Hotel[]> {
    let  subUrl = '/hotels';

    let params = new HttpParams();
    if (this.searchCriteria === undefined || this.searchCriteria == null || this.searchCriteria.isEmpty()) {
       subUrl = '/allhotels';
    } else {
      params =  params.append('destinationName', this.searchCriteria.destCity);
      params = params.append('minTripStartDate', formatDate(this.searchCriteria.dateFrom));
      params = params.append('maxTripEndDate', formatDate(this.searchCriteria.dateTo));
    }

    const deal$ = this.http
      .get(this.baseUrl + subUrl, {headers: this.getHeaders(), params: params})
      ;
    return deal$.map(mapHotels);
  }

  private getHeaders() {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public setSearchCriteria(search: Search) {
    this.searchCriteria = search;
  }

  public trigger() {
    this.getHotels();
  }
}


function mapHotels(response: any[]): Hotel[] {
  const hotels: Hotel[] = response.map(toDeal);
  hotels.map(({hotelName}) => ({description : hotelName}));
  for (const hotel of hotels) {
    hotel.description = hotel.hotelName;
    hotel.clickURL = hotel.hotelURL;
  }
  return hotels;
}
function toDeal(d: any): Hotel {
  return d;
}
function formatDate(date): string {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return year + '-' + (monthIndex + 1) + '-' + day;
}
