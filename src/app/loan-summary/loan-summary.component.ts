import { Component, OnInit, Input } from '@angular/core';
import { LoanDetails } from '../models/loan-details';

@Component({
  selector: 'app-loan-summary',
  templateUrl: './loan-summary.component.html',
  styleUrls: ['./loan-summary.component.css']
})
export class LoanSummaryComponent implements OnInit {
  @Input() loanDetails: LoanDetails;
  constructor() { }

  ngOnInit() {
  }

}
