import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { spacex } from '../Model/spacex.model';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  
  url = "https://api.spaceXdata.com/v3/launches?limit=100";
  constructor(private httpClient: HttpClient) {}

  getSpaceXData()
  {
    return this.httpClient.get<spacex[]>(this.url);
  }

  getSpaceXWithFilters()
  {
    return this.httpClient.get<spacex[]>(this.url);
  }

  filterYear(year:any){
    return this.httpClient.get(this.url +"&launch_year="+year);
  }

  filterLaunchSuccess(ls:any){
    return this.httpClient.get(this.url +"&launch_success="+ls);
  }

  filterLandSuccess(ls:any){
    debugger;
    //return this.Http.get(this.Url + "land_success=" + param);
    return this.httpClient.get(this.url +"&land_success="+ls);
  }

  filterLaunchLand(launchS:boolean,landS:boolean){
    console.log("Fromed URl : "+this.url +"&launch_success="+launchS+"&land_success="+landS)
    return this.httpClient.get(this.url +"&launch_success="+launchS+"&land_success="+landS);
  }

  filterAll(launchS:boolean,landS:boolean,year:any){
    return this.httpClient.get(this.url +"&launch_success="+launchS+"&land_success="+landS+"&launch_year="+year);
  }
}
