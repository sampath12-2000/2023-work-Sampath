import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { RollOffService } from '../shared/roll-off.service';
import { UserStoreService } from '../shared/user-store.service';

@Component({
  selector: 'app-roll-off-details',
  templateUrl: './roll-off-details.component.html',
  styleUrls: ['./roll-off-details.component.css']
})
export class RollOffDetailsComponent {
  newdata:any=[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [10];
  public role:string;
  constructor(private apiservice:RollOffService, public userStore:UserStoreService, public auth:AuthService){ // apiservice is the object of service.
    //let userdetails=this.apiservice.getAPI().subscribe(data=>console.log(data));
    //this.apiservice.getAPI().subscribe(data=>console.log(data));
    //console.log(userdetails);
  }
  ngOnInit(){
  this.apiservice.getAPI().subscribe(res=>{this.newdata=res;})
  this.userStore.getRoleFromStore()
  .subscribe(val=>{
    const roleFromToken = this.auth.getRoleFromToken();
    this.role = val || roleFromToken;
  })

  
 
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.apiservice.getAPI().subscribe(res=>{this.newdata=res;})
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.apiservice.getAPI().subscribe(res=>{this.newdata=res;})
  }

  SearchText='';
}
