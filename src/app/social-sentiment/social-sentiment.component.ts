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
  data: any[];
  symbol: string;
  res: Array<SocialSentiment> = [];

  constructor(
    private location: Location,
    private _Service: StockService,
    private actRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.symbol = this.actRoute.snapshot.params['symbol'];
    this.sentimaent(this.symbol);
    this._Service.Refreshrequired.subscribe((res) => {
      this.res = this._Service.getAllSentimaent(this.symbol);
    });
    this.res = this._Service.getAllSentimaent(this.symbol);
  }
  sentimaent(value: string) {
    this.symbol = 'p_' + value;
    this._Service.getSentimaent(value).subscribe((data) => {
      localStorage.setItem(this.symbol, JSON.stringify(data));
      this.res = this._Service.getAllSentimaent(this.symbol);
    });
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
