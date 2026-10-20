import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
providedIn: 'root'
})
export class HttpService {

    private baseUrl :  string = 'http://localhost:8082';

    constructor(private httpClient: HttpClient){}

    public get<T>(url : string) :  Observable<T>{
        return this.httpClient.get<T>(this.baseUrl + url);
    }

    public post<T>(url: string, body: any) :  Observable<T> {
        return this.httpClient.post<T>(this.baseUrl + url, body);
    }

    public patch<T>(url: string, body: unknown): Observable<T> {
        return this.httpClient.patch<T>(this.baseUrl + url, body);
    }
}