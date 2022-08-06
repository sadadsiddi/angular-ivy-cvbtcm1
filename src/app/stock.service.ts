import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StockService {
  public apiServer = 'https://finnhub.io/api/v1/';
  stocks: Array<Stock> = [];
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
        localStorage.key(i).charAt(0).toUpperCase()
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
    return this.allStorage().splice(0);
  }

  getSentimaent(val: string) {
    this.http
      .get(
        this.apiServer +
          'stock/insider-sentiment?symbol=' +
          val +
          '&from=2015-01-01&to=2022-03-01&token=bu4f8kn48v6uehqi3cqg'
      )
      .subscribe((data) => {
        localStorage.setItem(val, JSON.stringify(data));
        console.log(data);
      });
  }
}
export interface Stock {
  changeToday: number;
  currentPrise: number;
  openingPrise: number;
  HighPrice: number;
  key: string;
}
