import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private _Service: StockService) {}
  data: any[];

  ngOnInit() {
    this.data = this._Service.allStorage();
  }
  showImage(val: number): string {
    return val > 0 ? 'images/up.png' : 'images/down.png';
  }

  public getData(val1: string): void {
    this._Service.getQuote(val1.toUpperCase());
  }

  remove(val: string) {
    this._Service.remove(val);
    this.ngOnInit();
  }
}
