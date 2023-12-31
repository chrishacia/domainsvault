import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Domain {
  age: number;
  create_ts: string;
  days_left: number;
  expire_ts: string;
  id: number;
  insert_ts: string;
  isActive: number;
  isForSale: number;
  isParkable: number;
  isReserved: number;
  name: string;
  domain_tld: string;
  domain_length: number;
};

export interface DomainListResponse {
  domains: Domain[];
  tlds: string[];
};

@Injectable({
  providedIn: 'root',
})
export class DomainsService {
  private apiUrl = `${environment.apiUrl}/domain-list`;

  constructor(private http: HttpClient) {}

  getData(): Observable<DomainListResponse> {
    return this.http.get<DomainListResponse>(`${this.apiUrl}`)
    .pipe(map((res: any) => res.data));
  }
}
