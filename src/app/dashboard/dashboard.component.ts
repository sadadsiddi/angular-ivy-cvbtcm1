import { Component, OnInit } from '@angular/core';
import { Stock, StockService } from '../stock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private _Service: StockService) {}
  data: any[];
  showMe: boolean;
  res: Array<SocialSentiment> = [];

  senementalDatat: Array<SocialSentiment>;
  ngOnInit() {
    this.data = this._Service.allStorage();
  }
  showImage(val: number): string {
    return val > 0 ? 'images/up.png' : 'images/down.png';
  }
  showHideDiv(value: boolean) {
    this.showMe = !this.showMe;
  }
  showMeSentimnt(value: boolean) {
    this.showMe = value;
  }
  public getData(val1: string): void {
    this._Service.getQuote(val1.toUpperCase());
    this.ngOnInit();
  }
  sentimaent(value: string): Array<SocialSentiment> {
    this.showMe = !this.showMe;
    this.res = this._Service.getSentimaent(value);

    console.log(this.res);
    return this.res;
  }

  remove(val: string) {
    this._Service.remove(val);
    this.ngOnInit();
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
