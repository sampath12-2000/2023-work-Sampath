import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormService } from '../form/form.service';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { RollOffService } from '../shared/roll-off.service';
import { UserStoreService } from '../shared/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

   employee:any[];
 
   public fullname:string = "";

   public role:string;



   constructor(private api:ApiService, private auth:AuthService,private userStore:UserStoreService, private form:FormService) {}
  ngOnInit(): void {
    this.form.getForm().subscribe(res=>{this.employee=res;})
  }

  
   logout(){
    this.auth.signOut();
   }

   alertWithSuccess(){
    Swal.fire('Roll Off Initiated', 'success')
  }

  getRowsValue(flag: null) {
    if (flag === null) { return this.employee.length;
    } else {
      return this.employee.filter(i => (i.state == flag)).length;
    }
   }

}
