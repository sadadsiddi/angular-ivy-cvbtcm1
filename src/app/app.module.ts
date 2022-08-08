import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HelloComponent } from './hello.component';
import { StockService } from './stock.service';
import { HttpClientModule } from '@angular/common/http';
import { SocialSentimentComponent } from './social-sentiment/social-sentiment.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'sentiment/:symbol', component: SocialSentimentComponent },
];
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    DashboardComponent,
    SocialSentimentComponent,
  ],
  providers: [StockService],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
