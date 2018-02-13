import { Component, OnInit, Input } from '@angular/core';
import { LoanDetails } from '../models/loan-details';
import { Installment } from '../models/installment';

@Component({
  selector: 'app-loan-repayment-schedule',
  templateUrl: './loan-repayment-schedule.component.html',
  styleUrls: ['./loan-repayment-schedule.component.css']
})
export class LoanRepaymentScheduleComponent implements OnInit {
  @Input() loanDetails: LoanDetails;
  constructor() { }

  ngOnInit() {
  }
  onUpdateEmi() {
    this.loanDetails.updateInstallments();
  }

}
