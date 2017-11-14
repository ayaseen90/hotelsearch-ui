import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import {SearchComponent} from './search/search.component';
 import {DealsComponent} from './deals/deals.component';



const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'deals', component: DealsComponent },
  { path: '', redirectTo: '/deals', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
