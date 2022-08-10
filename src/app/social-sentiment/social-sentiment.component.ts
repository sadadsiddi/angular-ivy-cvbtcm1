import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../stock.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-social-sentiment',
  templateUrl: './social-sentiment.component.html',
  styleUrls: ['./social-sentiment.component.css'],
})
export class SocialSentimentComponent implements OnInit {
  symbol;
  showMe: boolean;
  data: any[];
  res: Array<SocialSentiment> = [];

  senementalDatat: Array<SocialSentiment>;

  constructor(
    private location: Location,
    private _Service: StockService,
    private actRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.symbol = this.actRoute.snapshot.params['symbol'];
    this.sentimaent(this.symbol);
  }
  sentimaent(value: string): Array<SocialSentiment> {
    this.res = this._Service.getSentimaent(value);

    return this.res;
  }

  backClicked() {
    this.location.back();
  }
}
export interface SocialSentiment {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number;
}
export interface SentiObj {
  data: SocialSentiment[];
  symbol: string;
}
