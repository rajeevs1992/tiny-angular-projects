import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { LoanDetails } from '../models/loan-details';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit {
  @Input() loanDetails: LoanDetails;
  @ViewChild('loanDetailsForm', { read: NgForm }) loanDetailsForm: NgForm;


  constructor() { }

  ngOnInit() {
  }
  onResetForm() {
    this.loanDetailsForm.reset();
    this.loanDetails.installments = null;
  }
  onCalculateInstallments() {
    if (this.loanDetailsForm.valid) {
      this.loanDetails.computeAndSetInstallments();
    }
  }
}
