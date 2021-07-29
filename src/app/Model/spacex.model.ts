
export class spacex {
   constructor( 
    public flight_number: number,
    public mission_name: string,
    public upcoming: boolean,
    public launch_year: string,
    public launch_success:boolean,
    public mission_id:number[],
    public land_success:boolean,
    public links:{
        mission_patch_small:string
    },
    public rocket:{
        rocket_name:string,
        first_stage:{
            cores:[{land_success:any}]
        }
    }
    )
    {

    }
}
