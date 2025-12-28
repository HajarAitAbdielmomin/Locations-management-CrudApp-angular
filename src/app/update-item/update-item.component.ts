import {Component, OnInit} from '@angular/core';
import {AppService} from "../app.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit{
  alert : boolean = false
  editlocation = new FormGroup({
    id : new FormControl(''),
    name : new FormControl(''),
    city :new FormControl(''),
    state :new FormControl('Choose a state ...'),
    photo : new FormControl(''),
    availableUnits : new FormControl(''),
    wifi : new FormControl(''),
    laundry : new FormControl('')
  })
  stateCodes:any[] = [];
  constructor(private router : ActivatedRoute,private app: AppService) {

  }
  ngOnInit():void {
    this.stateCodes = [ "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
      "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
      "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
    //console.warn(this.router.snapshot.params['id'])
    this.app.getLocation(this.router.snapshot.params['id'])
      .subscribe((result:any)=>{

        console.warn("location : ",result)

        this.editlocation = new FormGroup({
        id : new FormControl(result['id']),
        name : new FormControl(result['name']),
        city :new FormControl(result['city']),
        state :new FormControl(result['state']),
        photo : new FormControl(result['photo']),
        availableUnits : new FormControl(result['availableUnits']),
        wifi: new FormControl(result['wifi']  ? 'True' : 'False'),
        laundry : new FormControl(result['laundry'] ? 'True' : 'False')
      })

    })
  }
  collectUpdatedData(){
    if(this.editlocation.value.wifi === "False"){
      // @ts-ignore
      this.editlocation.value.wifi = false
    }
    if(this.editlocation.value.wifi === "True"){
      // @ts-ignore
      this.editlocation.value.wifi = true
    }
    if(this.editlocation.value.laundry === "False"){
      // @ts-ignore
      this.editlocation.value.laundry = false
    }
    if(this.editlocation.value.laundry === "True"){
      // @ts-ignore
      this.editlocation.value.laundry = true
    }
    this.app.updateLocation(this.router.snapshot.params['id'],this.editlocation.value)
      .subscribe((res)=>{
        console.warn(res)
        this.alert = true
      })
  }
  closeAlert(){
    this.alert = false
  }
}
