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
  showMe: boolean;
  ngOnInit() {
    this.data = this._Service.allStorage();
  }
  public getData(val1: string): void {
    this.data = this._Service.getQuote(val1.toUpperCase());
  }

  remove(val: string) {
    this.data = this._Service.remove(val).splice(0);
  }
  sentimaent(value: string) {
    this.showMe = !this.showMe;
  }
  showHideDiv(value: boolean) {
    this.showMe = !this.showMe;
  }
  showMeSentimnt(value: boolean) {
    this.showMe = value;
  }
}
