import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../form/form.service';
import { RollOffService } from '../shared/roll-off.service';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.css']
})
export class FormDetailComponent {
  constructor(public form:FormService,
    private readonly route:ActivatedRoute){
  }
employeeId:string|null|undefined;
employee:any={
  id:'',
  name:'',
  practice:'',
  performanceIssue:'',
    technicalSkill:'',
    /*localGrade:string='';
    rollOffEndDate:Date;
    resigned:string='';
    communication:string='';
    primarySkill:string='';
    reasonForRollOff:string='';
    underProbation:string='';
    roleCompetencies:string='';
    projectCode:string='';
    otherReasons:string='';
    longLeave:string='';
    remarks:string='';
    projectName:string='';
    thisReleaseNeedsBackfillIsBackfilled:string='';
    leaveType:string='';
    relevantExperienceYears:string='';*/
}

ngOnInit(): void{
  this.route.paramMap.subscribe(
    (params)=>{
      this.employeeId=params.get('id');
      if(this.employeeId){
        this.form.getFormId(this.employeeId)
        .subscribe(
          (successResponse)=>{
            this.employee=successResponse;
            console.log(this.employee);
          }
        );
      }
    }
  );
}

}
