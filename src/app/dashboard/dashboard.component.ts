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
  value: string;
  ngOnInit() {
    this._Service.Refreshrequired.subscribe((res) => {
      this.data = this._Service.allStorage();
    });
    this.data = this._Service.allStorage();
  }
  public getData(val: string) {
    //FETCH STOCKS CALLED HERE
    this.value = val;
    this._Service.getQuote(val.toUpperCase()).subscribe((data) => {
      localStorage.setItem(val, JSON.stringify(data, ['dp', 'c', 'o', 'h']));
      this.data = this._Service.allStorage();
    });
    console.log(this.data);
  }

  remove(val: string) {
    this._Service.remove(val);
    this.ngOnInit();
  }
  showImage(val: number): string {
    return val > 0 ? 'images/up.png' : 'images/down.png';
  }
}
