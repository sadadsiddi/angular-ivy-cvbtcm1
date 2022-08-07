import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StockService {
  public apiServer = 'https://finnhub.io/api/v1/';
  stocks: Array<Stock> = [];
  res: Array<SocialSentiment> = [];
  dataStore: any[];
  senementalDatat: SocialSentiment;
  monthsval: number[] = new Array();

  sentyStocks: SocialSentiment;
  sentiObj: SentiObj;
  constructor(private http: HttpClient) {}

  getQuote(val: string) {
    this.http
      .get(
        this.apiServer + 'quote?symbol=' + val + '&token=bu4f8kn48v6uehqi3cqg'
      )
      .subscribe((data) => {
        localStorage.setItem(val, JSON.stringify(data, ['dp', 'c', 'o', 'h']));
      });
    this.allStorage();
  }

  allStorage(): Array<Stock> {
    for (let i = 0; i < localStorage.length; i++) {
      if (
        localStorage.key(i).charAt(0) ===
          localStorage.key(i).charAt(0).toUpperCase() &&
        !localStorage.key(i).charAt(0).startsWith('_')
      ) {
        const jsonObj = JSON.parse(localStorage.getItem(localStorage.key(i))); // string to "any" object first
        const stock = jsonObj as Stock;
        stock.key = localStorage.key(i);
        this.stocks.push(stock);
      }
    }
    return this.stocks.splice(0);
  }
  remove(val: string) {
    localStorage.removeItem(val);
  }
  checkMonth(value: number): boolean {
    for (var i = 0; i < 3; i++) {
      if (this.monthsval[i] !== value) {
      } else {
        return false;
      }
    }
    this.monthsval[this.monthsval.length] = value;
    return true;
  }
  getSentimaent(val: string): any[] {
    let para = 'p_' + val;
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

    for (this.senementalDatat of this.sentiObj.data) {
      if (this.checkMonth(this.senementalDatat.month)) {
        this.res.push(this.senementalDatat);
      }
    }
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
