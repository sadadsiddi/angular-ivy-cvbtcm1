import { Component, OnInit } from '@angular/core';
import { Stock, StockService } from '../stock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private _Service: StockService) {}

  ngOnInit() {}
}
