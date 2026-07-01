import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // readonly baseUrl = 'http://localhost:5000/api';
  // readonly imgUrl = 'http://localhost:5000';
  readonly baseUrl = 'https://api.thejewelbeautiq.com/api';
  readonly imgUrl = 'https://api.thejewelbeautiq.com';
}
