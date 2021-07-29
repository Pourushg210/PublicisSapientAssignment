import { Component, OnInit,PLATFORM_ID,Inject } from '@angular/core';
import { spacex } from 'src/app/Model/spacex.model';
import { SpacexService } from 'src/app/Services/spacex.service';
import { HttpParams } from '@angular/common/http';
import { isPlatformServer,isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-space-x-view',
  templateUrl: './space-x-view.component.html',
  styleUrls: ['./space-x-view.component.css']
})
export class SpaceXViewComponent implements OnInit {

  isLoading:boolean = true;
  launchYears  = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
  booleanArray = [true,false];
  spaceShipData: spacex[];
  flight_name:string[] = [];
  landSuccess:any;
  launch_success:any;
  limit:number =  100;

  launchYear:any;

  isYearApplied    = false;
  isLaunchSApplied = false;
  isLandSApplied   = false;
  constructor(@Inject(PLATFORM_ID) private platformId:object,
    private spacexService: SpacexService,
    private activatedRoute:ActivatedRoute,
    private route:Router) {
     this.spaceShipData = [];
   }

  ngOnInit(): void {

    if(isPlatformBrowser(this.platformId))
    this.getSpaceXData();
    
  }

  getSpaceXData(){


    this.spacexService.getSpaceXData().subscribe((response:spacex[])=>{
      console.log(JSON.stringify(response));
      this.spaceShipData = <spacex[]>response;
      const temp = [];
       for(let spData in this.spaceShipData){
         temp.push(this.spaceShipData[spData].launch_year)
        if(this.spaceShipData[spData]!=null || this.spaceShipData[spData]!=undefined)
        {
          //debugger;
           //this.launchSuccess.push(this.spaceShipData[spData].launch_success);
          if(this.spaceShipData[spData].rocket!=null || this.spaceShipData[spData].rocket!=undefined)
            {
             // this.landSuccess.push(this.spaceShipData[spData].rocket.first_stage.cores[0].land_success)
            }
        }
        else{
          //this.launchSuccess.push(" ");
          this.landSuccess.push(" ");
        }
     }
    })
  }

  applyLaunchYear(year:any){
    this.isYearApplied = true;
    this.launchYear = year;
    this.route.navigate([""],{
      queryParams:{limit:this.limit,launch_year:this.launchYear}
    })
    this.spacexService.filterYear(this.launchYear).subscribe((filteredResponse)=>{
      this.spaceShipData = <spacex[]>filteredResponse;
    })
  }

  filterLaunchSuccess(launchSuccess:any){
    this.isLaunchSApplied = true;
    this.launch_success = launchSuccess;
    this.route.navigate([""],{
      queryParams:{limit:this.limit,launch_success:this.launch_success}
    })

    this.spacexService.filterLaunchSuccess(this.launch_success).subscribe(filteredResponse=>{
      this.spaceShipData = <spacex[]>filteredResponse;
    })
  }

  filterLandSuccess(landSuccess:any){
    this.isLandSApplied = true;
    this.landSuccess = landSuccess;

    if(!this.isYearApplied && this.isLaunchSApplied )
    {
    this.route.navigate([""],{
      queryParams:{limit:this.limit,launch_success:this.launch_success,land_success:this.landSuccess}
    })
    this.spacexService.filterLaunchLand(this.launch_success,this.landSuccess).subscribe(filteredResponse=>{

      this.spaceShipData = <spacex[]>filteredResponse;
    })
  }

  if(!this.isYearApplied && !this.isLaunchSApplied)
  {
    this.route.navigate([""],{
      queryParams:{limit:this.limit,land_success:this.landSuccess}
    })

    this.spacexService.filterLandSuccess(this.landSuccess).subscribe(filteredResponse=>{
      this.spaceShipData = <spacex[]>filteredResponse;
    })
  }

  if(this.isYearApplied && this.isLaunchSApplied)
  {
    this.route.navigate([""],{
      queryParams:{limit:this.limit,launch_success:this.launch_success,land_success:this.landSuccess,launch_year:this.launchYear}
    })

    this.spacexService.filterAll(this.launch_success,this.landSuccess,this.launchYear).subscribe(filteredResponse=>{
      this.spaceShipData = <spacex[]>filteredResponse;
    })
  }
}
  // filterLaunchLand(launch:boolean,land:boolean){   
  //   if(!this.launchYear && this.launch_success )
  //   {
  //   this.launch_success = launch;
  //   this.landSuccess = land;
  //   this.route.navigate([""],{
  //     queryParams:{limit:this.limit,launch_success:this.launch_success,land_success:this.landSuccess}
  //   })
  //   this.spacexService.filterLaunchLand(this.launch_success,this.landSuccess).subscribe(filteredResponse=>{
  //     this.spaceShipData = <spacex[]>filteredResponse;
  //   })
  // }
  // else if(!this.launchYear && !this.launch_success){
  // }
  // }

}
