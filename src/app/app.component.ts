import { Component } from '@angular/core';
import { LoanDetails } from './models/loan-details';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public loanDetails: LoanDetails;

  ngOnInit() {
    this.loanDetails = new LoanDetails();
  }
}
