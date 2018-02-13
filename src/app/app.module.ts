import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { LoanRepaymentScheduleComponent } from './loan-repayment-schedule/loan-repayment-schedule.component';
import { CommonModule } from '@angular/common';
import { LoanSummaryComponent } from './loan-summary/loan-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    LoanDetailsComponent,
    LoanRepaymentScheduleComponent,
    LoanSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
