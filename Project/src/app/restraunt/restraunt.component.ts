import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restraunt.model';

@Component({
  selector: 'app-restraunt',
  templateUrl: './restraunt.component.html',
  styleUrls: ['./restraunt.component.css']
})
export class RestrauntComponent implements OnInit {


  formValue!: FormGroup
  reataurantModelObj: RestaurantData = new RestaurantData;
  allRestaurantData: any;
  showAdd!:boolean;
  showbtn!:boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      services: ['']

    })
    this.getAllData()
  }

  clickAddResto(){
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }
  addResto() {
    this.reataurantModelObj.name = this.formValue.value.name;
    this.reataurantModelObj.email = this.formValue.value.email;
    this.reataurantModelObj.phone = this.formValue.value.phone;
    this.reataurantModelObj.address = this.formValue.value.address;
    this.reataurantModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.reataurantModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurant Record Added Succesfully");

      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllData();
    },
      err => {
        alert("Something went wrong");
      }
    )
  }
  getAllData() {
    this.api.getRestaurant().subscribe(res => {
      this.allRestaurantData = res;
    })
  }


  deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res =>{
      alert("Record deleted Succcessfully");
      this.getAllData();
    })
  }


  OnEdit(data:any){
    this.showAdd = false;
    this.showbtn = true;

    this.reataurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['phone'].setValue(data.phone);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services)
  }
  UpdateResto(){
    this.reataurantModelObj.name = this.formValue.value.name;
    this.reataurantModelObj.email = this.formValue.value.email;
    this.reataurantModelObj.phone = this.formValue.value.phone;
    this.reataurantModelObj.address = this.formValue.value.address;
    this.reataurantModelObj.services = this.formValue.value.services;


    this.api.updateRestaurant(this.reataurantModelObj, this.reataurantModelObj.id).subscribe(_res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset();
      this.getAllData();
    })
  }
}


// function addResto() {
//   throw new Error('Function not implemented.');
// }

