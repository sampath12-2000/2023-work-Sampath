import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 private baseUrl:string = "http://localhost:14342/api/User/GetUsers";

  constructor(private http:HttpClient) { }

  getUser(){
    return this.http.get<any>(this.baseUrl);
  }
}
