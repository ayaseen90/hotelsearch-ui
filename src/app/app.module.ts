import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { NgDatepickerModule } from 'ng2-datepicker';
import { AppRoutingModule } from './/app-routing.module';
import { ApiService } from './api.service';
import { DealsComponent } from './deals/deals.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DealsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgDatepickerModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService, DealsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
