import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StockService {
  public apiServer = 'https://finnhub.io/api/v1/';
  stocks: Array<Stock> = [];
  res: Array<SocialSentiment> = [];
  dataStore: any[];
  senementalDatat: Array<SocialSentiment>;
  monthsval: any;

  sentyStocks: SocialSentiment;
  sentiObj: SentiObj;
  constructor(private http: HttpClient) {}

  getQuote(val: string): Array<Stock> {
    this.http
      .get(
        this.apiServer + 'quote?symbol=' + val + '&token=bu4f8kn48v6uehqi3cqg'
      )
      .subscribe((data) => {
        localStorage.setItem(val, JSON.stringify(data, ['dp', 'c', 'o', 'h']));
      });
    return this.allStorage().splice(0);
  }

  allStorage(): Array<Stock> {
    for (let i = 0; i < localStorage.length; i++) {
      if (
        localStorage.key(i).charAt(0) ===
          localStorage.key(i).charAt(0).toUpperCase() &&
        !localStorage.key(i).charAt(0).startsWith('_')
      ) {
        let jsonObj = JSON.parse(localStorage.getItem(localStorage.key(i))); // string to "any" object first
        let stock = jsonObj as Stock;
        stock.key = localStorage.key(i);
        this.stocks.push(stock);
      }
    }
    return this.stocks;
  }
  remove(val: string) {
    localStorage.removeItem(val);
    this.allStorage().splice(0);
  }
  getSentimaent(val: string): any[] {
    let para = 'p_' + val;
    console.log('enter into method');
    this.http
      .get(
        this.apiServer +
          'stock/insider-sentiment?symbol=' +
          val +
          '&from=2019-01-01&to=2022-03-01&token=bu4f8kn48v6uehqi3cqg'
      )
      .subscribe((data) => {
        localStorage.setItem(para, JSON.stringify(data));
      });
    let jsonObj = JSON.parse(localStorage.getItem(para));
    this.sentiObj = jsonObj as SentiObj;
    for (let i = 0; this.sentiObj.data.length; i++) {
      if (
        this.sentiObj.data[i].month < 4 &&
        this.monthsval === this.sentiObj.data[i].month
      ) {
        this.monthsval = this.sentiObj.data[i].month;
        this.sentyStocks = jsonObj as SocialSentiment;
        this.sentyStocks.change = this.sentiObj.data[i].change;
        this.sentyStocks.month = this.sentiObj.data[i].month;
        this.sentyStocks.mspr = this.sentiObj.data[i].mspr;
        this.sentyStocks.symbol = this.sentiObj.data[i].symbol;
        this.res.push(this.sentyStocks);
      }
    }
    console.log(this.monthsval);
    return this.res;
  }
}
export interface Stock {
  changeToday: number;
  currentPrise: number;
  openingPrise: number;
  HighPrice: number;
  key: string;
}

export interface SentiObj {
  data: SocialSentiment[];
  symbol: string;
}

export interface SocialSentiment {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number;
}
