import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Flight } from '../entities/flight';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  from: string;
  to: string;
  flights: Flight[] = [];
  selectedFlight: Flight;

  message: string;

  private url = 'http://www.angular.at/api/flight';
  private headers = new HttpHeaders().set('Accept', 'application/json');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  search(): void {
    const params = new HttpParams().set('from', this.from).set('to', this.to);

    this.http.get<Flight[]>(this.url, { headers: this.headers, params }).subscribe({
      next: (flights: Flight[]) => {
        this.flights = flights;
      },
      error: (errResp) => {
        console.error('Error loading flights', errResp);
      },
      complete: () => {
        console.warn('complete');
      }
    });
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  save(): void {
    this.http.post<Flight>(this.url, this.selectedFlight, { headers: this.headers }).subscribe({
      next: (flight) => {
        this.selectedFlight = flight;
        this.message = 'Success!';
      },
      error: (errResponse) => {
        console.error('Error', errResponse);
        this.message = 'Error: ';
      }
    });
  }
}
