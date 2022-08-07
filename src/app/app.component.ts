import { Component, VERSION } from '@angular/core';
import { StockService } from './stock.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private _Service: StockService) {}
  data: any[];
  res: Array<SocialSentiment> = [];

  senementalDatat: Array<SocialSentiment>;
  showMe: boolean;
  ngOnInit() {
    this.data = this._Service.allStorage();
  }
  showImage(val: number): string {
    return val > 0 ? 'images/up.png' : 'images/down.png';
  }
  public getData(val1: string): void {
    this.data = this._Service.getQuote(val1.toUpperCase());
  }

  remove(val: string) {
    this._Service.remove(val);
  }

  sentimaent(value: string): Array<SocialSentiment> {
    this.showMe = !this.showMe;
    this.res = this._Service.getSentimaent(value);

    console.log(this.res);
    return this.res;
  }
  showHideDiv(value: boolean) {
    this.showMe = !this.showMe;
  }
  showMeSentimnt(value: boolean) {
    this.showMe = value;
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
