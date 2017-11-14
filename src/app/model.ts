export interface Offer {
  order: number;
  offerDateRange: DateRange;
  destination: string;
  image: string;
  dealType: string;
  description: string;
  clickURL: string;
}
export class DateRange {
  startDate: Date;
  endDate: Date;
}
export class Hotel implements Offer {
  clickURL: string;
  order: number;
  offerDateRange: DateRange;
  destination: string;
  image: string;
  hotelName: string;
  description: string;
  dealType = 'Hotel';
  hotelURL = '';
}
export class Search {
dateFrom: Date;
dateTo: Date;
destCity: string;


  public isEmpty() {
    return this.dateFrom == null || this.dateTo == null || this.destCity === null;
  }
}
