import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

@Component({
  selector: 'app-home',
  template: `<h3>{{ users | json  }}</h3><button (click)="fetchData()">Fetch data</button>`
})
export class HomeComponent {
  public users: any;

  constructor(private http: HttpClient) {}

  public fetchData() {
    const headersDefault: HttpHeaders = new HttpHeaders({
      Accept: 'application/json; charset=UTF-8',
      'Cache-Control': 'no-cache',
      'Cache-control': 'no-store',
      Expires: '0',
      Pragma: 'no-cache',
      'Content-Type': 'application/json; charset=UTF-8',
      'Require-Content-Type': 'application/json',
      timeout: `60000`
    });
    // Merge default headers with new headers
    //
    const headerRequest: HttpHeaders = headersDefault;
    this.http.post('http://localhost:4000/users', { name: 'some-data' }, { headers: headerRequest }).subscribe(data => {
      console.log(data);
      this.users = data;
    });
  }
}
