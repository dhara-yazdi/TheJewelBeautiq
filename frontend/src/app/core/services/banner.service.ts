import {Injectable,signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {ApiService} from './api.service';
import { BannerListItem } from '../../shared/models/BannerListItem';

@Injectable({providedIn: 'root'})
export class BannerService {
    banners = signal<BannerListItem[]>([]);
    loading = signal(false);

    constructor(private http: HttpClient, private api: ApiService) {}

    getBanners(): Observable<BannerListItem[]> {
        this.loading.set(true);
        return this.http.get<BannerListItem[]>(`${this.api.baseUrl}/banners`).pipe(
            tap(banners => {
                this.banners.set(banners);
                this.loading.set(false);
            })
        );
    }
}


